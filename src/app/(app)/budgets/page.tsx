import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budgets } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function BudgetsPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">
            Manage your spending and stay on track.
          </p>
        </div>
        <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Budget (Premium)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.limit) * 100;
          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle className="text-xl">{budget.category}</CardTitle>
                <CardDescription>
                  {formatCurrency(budget.spent)} spent of{" "}
                  {formatCurrency(budget.limit)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2 mb-2" />
                <div className="text-sm text-muted-foreground">
                  {progress > 100
                    ? `${formatCurrency(budget.spent - budget.limit)} over budget`
                    : `${formatCurrency(budget.limit - budget.spent)} remaining`}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
       <div className="mt-8 text-center text-muted-foreground">
        Want more control? <a href="#" className="text-primary underline">Upgrade to Premium</a> to create custom budgets and rules.
      </div>
    </div>
  );
}
