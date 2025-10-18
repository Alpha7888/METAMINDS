import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoalsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Financial Goals</h1>
       <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is where your financial goal tracking will be displayed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
