"use client";

import { TrendingUp } from "lucide-react";
import {
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";

export function FinancialHealthCard() {
  // These would be calculated from user data
  const savingsRate = 15; // percent
  const creditUtilization = 20; // percent
  const debtToIncome = 30; // percent

  // A simple scoring model (out of 100)
  const savingsScore = Math.min(savingsRate / 20, 1) * 40; // Max 40 points for 20%+ savings rate
  const creditScore = (1 - Math.min(creditUtilization / 30, 1)) * 30; // Max 30 points for <30% utilization
  const debtScore = (1 - Math.min(debtToIncome / 40, 1)) * 30; // Max 30 points for <40% DTI

  const financialHealthScore = Math.round(savingsScore + creditScore + debtScore);
  const chartData = [{ name: "score", value: financialHealthScore, fill: "hsl(var(--primary))" }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Financial Health Score</CardTitle>
        <CardDescription>An overview of your financial wellness.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(var(--primary))",
            },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="100%"
            barSize={20}
            cy="50%"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              background={{ fill: "hsl(var(--muted))" }}
              cornerRadius={10}
            />
             <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-4xl font-bold"
            >
              {financialHealthScore}
            </text>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-sm"
            >
              out of 100
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          You're doing great this month!
        </div>
      </CardFooter>
    </Card>
  );
}
