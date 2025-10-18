import { PortfolioClient } from "@/components/portfolio/portfolio-client";
import { investments } from "@/lib/data";

export default function PortfolioPage() {
  // In a real app, you would fetch this data from an API
  const portfolioData = investments;

  return <PortfolioClient initialData={portfolioData} />;
}
