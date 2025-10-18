"use client";

import { Pie, PieChart, Cell, Tooltip } from "recharts";
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
import { transactions } from "@/lib/data";

const spendingData = transactions
  .filter((t) => t.amount < 0 && t.category !== "Income")
  .reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = 0;
    }
    acc[t.category] += Math.abs(t.amount);
    return acc;
  }, {} as { [key: string]: number });

const chartData = Object.entries(spendingData).map(([category, amount]) => ({
  name: category,
  value: amount,
}));

const chartConfig = {
  value: { label: "Amount" },
  ...Object.fromEntries(
    chartData.map((d, i) => [
      d.name,
      { label: d.name, color: `hsl(var(--chart-${(i % 5) + 1}))` },
    ])
  ),
};

export function SpendingCard() {
  const totalSpent = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Your spending by category this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.name]?.color}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-2xl font-bold"
            >
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(totalSpent)}
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-sm"
            >
              Total Spent
            </text>
          </PieChart>
        </ChartContainer>
         <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
          {Object.entries(chartConfig)
            .filter(([key]) => key !== 'value')
            .map(([category, config]) => (
              <div key={category} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span>{config.label}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
