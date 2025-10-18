import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accounts, investments, loans } from "@/lib/data";

export function NetWorthCard() {
  const totalAssets = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.currentPrice,
    0
  ) + accounts.filter(acc => acc.type !== 'credit').reduce((sum, account) => sum + account.balance, 0);

  const totalLiabilities = loans.reduce((acc, loan) => acc + loan.remainingBalance, 0) + Math.abs(accounts.filter(acc => acc.type === 'credit').reduce((sum, account) => sum + account.balance, 0));

  const netWorth = totalAssets - totalLiabilities;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth</CardTitle>
        <CardDescription>
          Your financial snapshot: Assets minus Liabilities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
                <div className="text-sm text-muted-foreground">Total Assets</div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalAssets)}</div>
            </div>
             <div>
                <div className="text-sm text-muted-foreground">Total Liabilities</div>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</div>
            </div>
             <div>
                <div className="text-sm text-muted-foreground">Net Worth</div>
                <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
