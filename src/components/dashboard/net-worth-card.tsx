import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accounts, investments, loans } from "@/lib/data";
import { ArrowDown, ArrowUp } from "lucide-react";

export function NetWorthCard() {
  const totalAssets =
    investments.reduce(
      (acc, inv) => acc + inv.quantity * inv.currentPrice,
      0
    ) +
    accounts
      .filter((acc) => acc.type !== "credit")
      .reduce((sum, account) => sum + account.balance, 0);

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

  return (
    <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Net Worth</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Your financial snapshot: Assets minus Liabilities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-5xl font-bold tracking-tighter">
              {formatCurrency(netWorth)}
            </p>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Your estimated financial value
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-500/20 p-2">
                 <ArrowUp className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <div className="text-sm text-primary-foreground/80">Assets</div>
                <div className="text-lg font-bold">{formatCurrency(totalAssets)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-500/20 p-2">
                 <ArrowDown className="h-5 w-5 text-red-300" />
              </div>
              <div>
                <div className="text-sm text-primary-foreground/80">Liabilities</div>
                <div className="text-lg font-bold">{formatCurrency(totalLiabilities)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}