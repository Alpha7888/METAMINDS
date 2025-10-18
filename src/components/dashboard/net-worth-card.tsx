import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { accounts, investments, loans } from "@/lib/data";
import { ArrowDown, ArrowUp, Banknote, Landmark, TrendingUp } from "lucide-react";

export function NetWorthCard() {
  const allAssets = [
    ...accounts.filter((acc) => acc.type !== 'credit').map(acc => ({ name: acc.name, value: acc.balance, type: acc.type === 'savings' ? 'Savings' : 'Checking' })),
    ...investments.map(inv => ({ name: inv.name, value: inv.quantity * inv.currentPrice, type: 'Investment' }))
  ];

  const totalAssets = allAssets.reduce((sum, asset) => sum + asset.value, 0);

  const totalLiabilities =
    loans.reduce((acc, loan) => acc + loan.remainingBalance, 0) +
    Math.abs(
      accounts
        .filter((acc) => acc.type === "credit")
        .reduce((sum, account) => sum + account.balance, 0)
    );

  const netWorth = totalAssets - totalLiabilities;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Savings':
      case 'Checking':
        return <Landmark className="h-6 w-6 text-primary-foreground/80" />;
      case 'Investment':
        return <TrendingUp className="h-6 w-6 text-primary-foreground/80" />;
      default:
        return <Banknote className="h-6 w-6 text-primary-foreground/80" />;
    }
  }

  return (
    <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Net Worth</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Your financial snapshot: Assets minus Liabilities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-5xl font-bold tracking-tighter">
              {formatCurrency(netWorth)}
            </p>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Your estimated financial value
            </p>
          </div>

          <div className="w-full md:w-3/5">
             <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-md mx-auto"
            >
              <CarouselContent>
                <CarouselItem className="md:basis-1/2">
                   <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10">
                    <div className="rounded-full bg-green-500/20 p-2">
                      <ArrowUp className="h-5 w-5 text-green-300" />
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/80">Total Assets</div>
                      <div className="text-lg font-bold">{formatCurrency(totalAssets)}</div>
                    </div>
                  </div>
                </CarouselItem>

                {allAssets.map((asset, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                     <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10 h-full">
                        <div className="rounded-full bg-black/20 p-2">
                          {getAssetIcon(asset.type)}
                        </div>
                        <div>
                          <div className="text-sm text-primary-foreground/80 truncate">{asset.name}</div>
                          <div className="text-lg font-bold">{formatCurrency(asset.value)}</div>
                        </div>
                      </div>
                  </CarouselItem>
                ))}
                 <CarouselItem className="md:basis-1/2">
                   <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10">
                    <div className="rounded-full bg-red-500/20 p-2">
                      <ArrowDown className="h-5 w-5 text-red-300" />
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/80">Liabilities</div>
                      <div className="text-lg font-bold">{formatCurrency(totalLiabilities)}</div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-10px] text-primary-foreground bg-primary/80 hover:bg-primary" />
              <CarouselNext className="absolute right-[-10px] text-primary-foreground bg-primary/80 hover:bg-primary" />
            </Carousel>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}