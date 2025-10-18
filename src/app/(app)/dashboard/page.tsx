import { NetWorthCard } from "@/components/dashboard/net-worth-card";
import { SpendingCard } from "@/components/dashboard/spending-card";
import { CashFlowCard } from "@/components/dashboard/cash-flow-card";
import { UpcomingBillsCard } from "@/components/dashboard/upcoming-bills-card";
import { FinancialHealthCard } from "@/components/dashboard/financial-health-card";
import { ProactiveInsightsCard } from "@/components/dashboard/proactive-insights-card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <NetWorthCard />
      </div>
      <div className="lg:col-span-2">
        <FinancialHealthCard />
      </div>

      <div className="lg:col-span-2">
        <SpendingCard />
      </div>

      <div className="lg:col-span-2">
        <CashFlowCard />
      </div>

      <div className="lg:col-span-4">
        <ProactiveInsightsCard />
      </div>

      <div className="lg:col-span-4">
        <UpcomingBillsCard />
      </div>
    </div>
  );
}
