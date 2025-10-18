"use client";

import { useState } from "react";
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
import { Investment } from "@/lib/data";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface PortfolioClientProps {
  initialData: Investment[];
}

export function PortfolioClient({ initialData }: PortfolioClientProps) {
  const [investments, setInvestments] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState<Investment | null>(
    null
  );
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const totalValue = investments.reduce(
    (acc, inv) => acc + inv.quantity * inv.currentPrice,
    0
  );
  const totalGainLoss = investments.reduce(
    (acc, inv) =>
      acc + (inv.currentPrice - inv.purchasePrice) * inv.quantity,
    0
  );

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investment Portfolio</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Investment
            </Button>
          </DialogTrigger>
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
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalValue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalGainLoss)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
          <CardDescription>
            A list of your current investments.
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
                <TableHead className="text-right">Gain/Loss</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => {
                const value = investment.quantity * investment.currentPrice;
                const gainLoss =
                  (investment.currentPrice - investment.purchasePrice) *
                  investment.quantity;
                return (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium">
                      {investment.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {investment.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(investment.purchasePrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(investment.currentPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
        
                        currency: "INR",
                      }).format(value)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        gainLoss >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(gainLoss)}
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
    </div>
  );
}
