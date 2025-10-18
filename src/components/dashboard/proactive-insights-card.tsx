"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, RefreshCw, Loader2 } from "lucide-react";
import { proactiveFinancialInsights } from "@/ai/flows/proactive-financial-insights";
import { accounts, transactions, goals } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function ProactiveInsightsCard() {
  const [insights, setInsights] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchInsights = () => {
    startTransition(async () => {
      try {
        const financialSummary = `
          Accounts: ${JSON.stringify(accounts)}
          Recent Transactions: ${JSON.stringify(transactions.slice(0, 10))}
        `;
        const spendingTrends = "User spends frequently on restaurants and subscriptions.";
        const financialGoals = JSON.stringify(goals);

        const result = await proactiveFinancialInsights({
          financialSummary,
          spendingTrends,
          financialGoals,
        });
        setInsights(result.insights);
      } catch (error) {
        console.error("Failed to fetch insights:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch AI insights.",
        });
      }
    });
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <CardTitle>Proactive Insights</CardTitle>
        </div>
        <CardDescription>
          Personalized advice from your AI assistant to improve your financial health.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending && insights.length === 0 ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : insights.length > 0 ? (
          insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-accent/20 rounded-full p-1.5 mt-1">
                <Lightbulb className="h-4 w-4 text-accent" />
              </div>
              <p className="text-sm text-foreground flex-1">{insight}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No new insights at the moment.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchInsights}
          disabled={isPending}
          className="mx-auto"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isPending ? "Generating..." : "Refresh Insights"}
        </Button>
      </CardFooter>
    </Card>
  );
}
