import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Budgets</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where your budget tracking will be displayed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
