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

export function SpendingCard() {
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
  
  const totalSpent = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>This Month's Spending</CardTitle>
        <CardDescription>Spending breakdown by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value, name) => (
                  <div className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    <span className="text-muted-foreground">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value as number)}</span>
                  </div>
                )}
                hideLabel 
              />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                if (percent < 0.05) return null;
                return (
                  <text
                    x={x}
                    y={y}
                    fill="hsl(var(--card-foreground))"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-xs font-medium"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.name]?.color}
                />
              ))}
            </Pie>
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
