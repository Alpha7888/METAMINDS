import { PortfolioClient } from "@/components/portfolio/portfolio-client";
import { investments, loans } from "@/lib/data";

export default function PortfolioPage() {
  // In a real app, you would fetch this data from an API
  const portfolioData = investments;
  const loansData = loans;

  return <PortfolioClient initialInvestments={portfolioData} initialLoans={loansData} />;
}
