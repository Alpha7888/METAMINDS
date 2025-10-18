import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accounts } from "@/lib/data";

export function NetWorthCard() {
  const netWorth = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth</CardTitle>
        <CardDescription>
          Your total financial value across all accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(netWorth)}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          +2.5% from last month
        </p>
      </CardContent>
    </Card>
  );
}
