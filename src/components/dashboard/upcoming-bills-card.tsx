import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Landmark, Car } from "lucide-react";
import { bills, loans } from "@/lib/data";
import { format, parseISO } from "date-fns";

export function UpcomingBillsCard() {
  const combinedBills = [
    ...bills.map((bill) => ({
      id: bill.id,
      name: bill.name,
      amount: bill.amount,
      dueDate: bill.dueDate,
      type: "bill",
      remaining: null,
    })),
    ...loans.map((loan) => ({
      id: loan.id,
      name: `${loan.name} EMI`,
      amount: loan.emi,
      // Assuming next EMI is due on the 1st of next month for demo purposes
      dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
      type: "loan",
      remaining: Math.ceil(loan.remainingBalance / loan.emi),
    })),
  ].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const getIcon = (item: (typeof combinedBills)[0]) => {
    if (item.type === 'loan') {
      return item.name.toLowerCase().includes('home') ? <Landmark className="h-5 w-5 text-muted-foreground" /> : <Car className="h-5 w-5 text-muted-foreground" />;
    }
    return <CalendarDays className="h-5 w-5 text-muted-foreground" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>
          Don't miss these upcoming payment deadlines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {combinedBills.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0 bg-muted rounded-full p-2">
                {getIcon(item)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.type === 'loan' && item.remaining ? (
                    `${item.remaining} payments remaining`
                  ) : (
                    `Due ${format(parseISO(item.dueDate), "MMM dd, yyyy")}`
                  )}
                </p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.amount)}
                </p>
                 <button className="text-xs text-primary hover:underline">Pay now</button>
              </div>
            </li>
          ))}
           {combinedBills.length === 0 && (
             <p className="text-muted-foreground text-sm text-center py-4">No upcoming payments. You're all caught up!</p>
           )}
        </ul>
      </CardContent>
    </Card>
  );
}
