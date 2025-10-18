"use client";

import { useState } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { answerFinancialQuery } from "@/ai/flows/answer-financial-queries";
import { accounts, transactions, loans, investments } from "@/lib/data";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create a comprehensive financial summary for the AI
      const totalAssets =
        accounts
          .filter((acc) => acc.type !== "credit")
          .reduce((sum, account) => sum + account.balance, 0) +
        investments.reduce(
          (sum, inv) => sum + inv.quantity * inv.currentPrice,
          0
        );

      const totalLiabilities =
        loans.reduce((acc, loan) => acc + loan.remainingBalance, 0) +
        Math.abs(
          accounts
            .filter((acc) => acc.type === "credit")
            .reduce((sum, account) => sum + account.balance, 0)
        );

      const netWorth = totalAssets - totalLiabilities;
      
      const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(value);
      };

      const financialSummary = `
        Net Worth: ${formatCurrency(netWorth)}
        Total Assets: ${formatCurrency(totalAssets)}
        Total Liabilities: ${formatCurrency(totalLiabilities)}
        Accounts: ${JSON.stringify(accounts)}
        Debts/Loans: ${JSON.stringify(loans)}
        Investments: ${JSON.stringify(investments)}
        Recent Transactions: ${JSON.stringify(transactions.slice(0, 10))}
      `;

      const result = await answerFinancialQuery({
        query: input,
        financialSummary: financialSummary,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get a response from the AI assistant.",
      });
      // Optionally remove the user's message or add an error message to the chat
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bot className="h-5 w-5" />
          <span className="sr-only">Open AI Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Conversational AI Assistant</SheetTitle>
          <SheetDescription>
            Ask questions about your finances in plain English.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 my-4 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 text-sm ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  {message.role === "user" && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex gap-3 text-sm">
                   <Avatar className="h-8 w-8">
                       <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  <div className="rounded-lg p-3 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter>
           <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              id="message"
              placeholder="How much did I spend on groceries?"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
