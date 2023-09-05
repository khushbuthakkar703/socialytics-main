import thumb from "@/public/images/thumb.svg";
import hearth from "@/public/images/hearth.svg";
import eye from "@/public/images/eye.svg";
import thunder from "@/public/images/thunder.svg";
import { MetricCard } from "./MetricCard";

interface DashboardMetricCardsProps {
  data: any;
  className?: string;
  isLoading?: boolean;
}

export const DashboardMetricCards = ({
  data: clientSummary,
  className = "",
  isLoading = false,
}: DashboardMetricCardsProps) => {
  const metricExamples = [
    {
      id: "Engagements",
      title: "Average Engagements per Tweet",
      avatarImg: thumb.src,
      avatarClassName: "bg-blue-500",
      comparePercent: "5.26",
      positiveTotal: true,
      positiveComparisson: true,
      subtitle: "Since last month",
      data: clientSummary?.tweetsData
        ? Object.fromEntries(
            Object.entries(clientSummary.tweetsData)
              .filter(([, data]: any) => data.count > 0)
              .map(([date, data]: any) => [date, data.engagements])
          )
        : {},
    },
    {
      id: "Impressions",
      title: "Average Impressions per Tweet",
      avatarImg: hearth.src,
      avatarClassName: "bg-red-600",
      comparePercent: "8.04",
      positiveTotal: true,
      positiveComparisson: false,
      subtitle: "Since last month",
      compareTo: clientSummary?.previousPeriod?.totalEngagements,
      data: clientSummary?.tweetsData
        ? Object.fromEntries(
            Object.entries(clientSummary.tweetsData)
              .filter(([, data]: any) => data.impressions > 0)
              .map(([date, data]: any) => [date, data.impressions])
          )
        : {},
    },
    {
      id: "Organics Engagements",
      title: "Average Organics Engagements",
      avatarImg: eye.src,
      avatarClassName: "bg-[#14CC26]",
      total: "18.32",
      compareTotal: "2.05",
      positiveTotal: true,
      positiveComparisson: true,
      subtitle: "Since last month",
      compareTo: clientSummary?.tweetsData
        ? clientSummary?.previousPeriod?.totalEngagements -
          Object.entries(clientSummary.previousPeriod.dates)
            .map((date: any): any => {
              return {
                value: date.promotedEngagements,
              };
            })
            .reduce((a: any, b: any) => a.value + b.value, 0)
        : 0,
      data: clientSummary?.tweetsData
        ? Object.fromEntries(
            Object.entries(clientSummary.tweetsData)
              .filter(([, data]: any) => data.engagements > 0)
              .map(([date, data]: any) => [
                date,
                data.engagements - data.promotedEngagements,
              ])
          )
        : {},
    },
    {
      id: "Promoted Engagements",
      title: "Average Promoted Engagements",
      avatarImg: thunder.src,
      avatarClassName: "bg-[#7860F4]",
      comparePercent: "3.05",
      positiveTotal: true,
      positiveComparisson: true,
      subtitle: "Since last month",
      compareTo: clientSummary?.tweetsData
        ? Object.entries(clientSummary.previousPeriod.dates)
            .map((date: any): any => {
              return {
                value: date.promotedEngagements,
              };
            })
            .reduce((a: any, b: any) => a.value + b.value, 0)
        : 0,
      data: clientSummary?.tweetsData
        ? Object.fromEntries(
            Object.entries(clientSummary.tweetsData)
              .filter(([, data]: any) => data.promotedEngagements > 0)
              .map(([date, data]: any) => [date, data.promotedEngagements])
          )
        : {},
    },
  ];

  return (
    <div>
      <div
        className={`grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 ${className}`}
      >
        {metricExamples?.length > 0 &&
          metricExamples.map((metric) => (
            <MetricCard key={metric.id} {...metric} isLoading={isLoading} />
          ))}
      </div>
    </div>
  );
};
