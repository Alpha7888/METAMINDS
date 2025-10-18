import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, CalendarDays } from "lucide-react";
import { bills } from "@/lib/data";
import { format, parseISO } from "date-fns";

export function UpcomingBillsCard() {
  const sortedBills = [...bills].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
        <CardDescription>
          Don't miss these upcoming payment deadlines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedBills.map((bill) => (
            <li key={bill.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0 bg-muted rounded-full p-2">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{bill.name}</p>
                <p className="text-sm text-muted-foreground">
                  Due {format(parseISO(bill.dueDate), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(bill.amount)}
                </p>
                 <button className="text-xs text-primary hover:underline">Pay now</button>
              </div>
            </li>
          ))}
           {bills.length === 0 && (
             <p className="text-muted-foreground text-sm text-center py-4">No upcoming bills. You're all caught up!</p>
           )}
        </ul>
      </CardContent>
    </Card>
  );
}
