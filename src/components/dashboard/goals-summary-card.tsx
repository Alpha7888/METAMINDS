import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { goals } from "@/lib/data";
import { Button } from "../ui/button";
import { ArrowUpRight, Target } from "lucide-react";

export function GoalsSummaryCard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Goal Progress</CardTitle>
        <CardDescription>
          How you're tracking towards your top goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        {goals.slice(0, 2).map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium flex items-center gap-2"><Target className="h-4 w-4" /> {goal.name}</p>
                <p className="text-sm font-semibold">{progress.toFixed(0)}%</p>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
              </p>
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/goals">
            View All Goals <ArrowUpRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
