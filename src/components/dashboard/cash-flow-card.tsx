"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", income: 4000, expenses: 2400 },
  { month: "February", income: 3000, expenses: 1398 },
  { month: "March", income: 5000, expenses: 3800 },
  { month: "April", income: 4780, expenses: 3908 },
  { month: "May", income: 4890, expenses: 4800 },
  { month: "June", income: 4390, expenses: 3800 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};

export function CashFlowCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow</CardTitle>
        <CardDescription>Income vs. Expenses over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
              barSize={20}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-expenses)"
              radius={4}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
