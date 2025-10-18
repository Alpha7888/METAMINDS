"use client";

import { useState } from "react";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Investment, Loan } from "@/lib/data";
import { PlusCircle, Edit, Trash2, Landmark, Car } from "lucide-react";

interface PortfolioClientProps {
  initialInvestments: Investment[];
  initialLoans: Loan[];
}

export function PortfolioClient({ initialInvestments, initialLoans }: PortfolioClientProps) {
  const [investments, setInvestments] = useState(initialInvestments);
  const [loans, setLoans] = useState(initialLoans);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState<Investment | null>(
    null
  );
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const totalAssets = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.currentPrice,
    0
  );
  const totalLiabilities = loans.reduce((acc, loan) => acc + loan.remainingBalance, 0);
  const netWorth = totalAssets - totalLiabilities;
  

  const handleEdit = (investment: Investment) => {
    setCurrentInvestment({ ...investment });
    setIsNew(false);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentInvestment({
      id: `inv${investments.length + 1}`,
      name: "",
      quantity: 0,
      purchasePrice: 0,
      currentPrice: 0,
    });
    setIsNew(true);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
    toast({
      title: "Success",
      description: "Investment removed from portfolio.",
    });
  };

  const handleSave = () => {
    if (!currentInvestment) return;

    if (isNew) {
      setInvestments([...investments, currentInvestment]);
      toast({
        title: "Success",
        description: "New investment added.",
      });
    } else {
      setInvestments(
        investments.map((inv) =>
          inv.id === currentInvestment.id ? currentInvestment : inv
        )
      );
      toast({
        title: "Success",
        description: "Investment updated.",
      });
    }
    setIsEditing(false);
    setCurrentInvestment(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentInvestment) return;
    const { name, value } = e.target;
    setCurrentInvestment({
      ...currentInvestment,
      [name]: name === "name" ? value : parseFloat(value) || 0,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  const chartData = investments.map(investment => ({
    name: investment.name,
    value: investment.quantity * investment.currentPrice,
  }));

  const chartConfig = {
    value: { label: "Value" },
    ...Object.fromEntries(
      chartData.map((d, i) => [
        d.name,
        { label: d.name, color: `hsl(var(--chart-${(i % 5) + 1}))` },
      ])
    ),
  };

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <DialogTrigger asChild>
              <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Investment
              </Button>
            </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNew ? "Add New Investment" : "Edit Investment"}
            </DialogTitle>
          </DialogHeader>
          {currentInvestment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentInvestment.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={currentInvestment.quantity}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchasePrice" className="text-right">
                  Purchase Price (₹)
                </Label>
                <Input
                  id="purchasePrice"
                  name="purchasePrice"
                  type="number"
                  value={currentInvestment.purchasePrice}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currentPrice" className="text-right">
                  Current Price (₹)
                </Label>
                <Input
                  id="currentPrice"
                  name="currentPrice"
                  type="number"
                  value={currentInvestment.currentPrice}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Net Worth</CardTitle>
              <CardDescription>Assets - Liabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(netWorth)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Assets</CardTitle>
              <CardDescription>Value of all your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(totalAssets)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Liabilities</CardTitle>
               <CardDescription>Total outstanding loan balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {formatCurrency(totalLiabilities)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
           <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Investments</CardTitle>
              <CardDescription>
                A list of your current investment holdings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Avg. Price</TableHead>
                    <TableHead className="text-right">Current Price</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((investment) => {
                    const value = investment.quantity * investment.currentPrice;
                    return (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">
                          {investment.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {investment.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(investment.purchasePrice)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(investment.currentPrice)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(value)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(investment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(investment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>
                A visual breakdown of your investment portfolio.
              </CardDescription>
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Loans & Liabilities</CardTitle>
            <CardDescription>
              Details of your outstanding loans and EMIs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="flex items-center p-4 border rounded-lg">
                <div className="flex-shrink-0 mr-4">
                  {loan.name.toLowerCase().includes('home') ? <Landmark className="h-8 w-8 text-primary" /> : <Car className="h-8 w-8 text-primary" />}
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{loan.name}</div>
                  <div>
                    <div className="text-sm text-muted-foreground">EMI</div>
                    <div className="font-semibold">{formatCurrency(loan.emi)}/month</div>
                  </div>
                   <div>
                    <div className="text-sm text-muted-foreground">Interest Rate</div>
                    <div className="font-semibold">{loan.interestRate}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Remaining Balance</div>
                    <div className="font-semibold">{formatCurrency(loan.remainingBalance)}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </Dialog>
  );
}
