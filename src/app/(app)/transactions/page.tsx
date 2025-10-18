import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
       <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where your transaction history will be displayed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
