import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { goals } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target } from "lucide-react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

export default function GoalsPage() {
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
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track your progress towards your biggest dreams.
          </p>
        </div>
         <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Goal (Premium)
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{goal.name}</CardTitle>
                </div>
                <CardDescription>
                  Target: {formatCurrency(goal.targetAmount)} by{" "}
                  {format(parseISO(goal.deadline), "MMM yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Progress value={progress} className="h-2" />
                <p className="text-center font-bold text-lg my-4">
                  {formatCurrency(goal.currentAmount)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    ({progress.toFixed(0)}%)
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground w-full text-center">
                  Deadline in {formatDistanceToNow(parseISO(goal.deadline))}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
       <div className="mt-8 text-center text-muted-foreground">
        <a href="#" className="text-primary underline">Upgrade to Premium</a> for goal-based tracking and automated progress monitoring.
      </div>
    </div>
  );
}
