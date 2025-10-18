import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const NetWorthCard = dynamic(
  () => import('@/components/dashboard/net-worth-card').then((mod) => mod.NetWorthCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[148px]" /> 
  }
);
const SpendingCard = dynamic(
  () => import('@/components/dashboard/spending-card').then((mod) => mod.SpendingCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[438px]" />
  }
);
const CashFlowCard = dynamic(
  () => import('@/components/dashboard/cash-flow-card').then((mod) => mod.CashFlowCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[350px]" />
  }
);
const UpcomingBillsCard = dynamic(
  () => import('@/components/dashboard/upcoming-bills-card').then((mod) => mod.UpcomingBillsCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[308px]" />
  }
);
const FinancialHealthCard = dynamic(
  () => import('@/components/dashboard/financial-health-card').then((mod) => mod.FinancialHealthCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[416px]" />
  }
);
const ProactiveInsightsCard = dynamic(
  () => import('@/components/dashboard/proactive-insights-card').then((mod) => mod.ProactiveInsightsCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[310px]" />
  }
);

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
