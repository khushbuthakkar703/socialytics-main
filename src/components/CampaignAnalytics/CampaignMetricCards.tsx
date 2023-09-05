import like from "@/public/images/like.svg";
import retweet from "@/public/images/retweet.svg";
import eye from "@/public/images/eye.svg";
import comment from "@/public/images/comment.svg";
import { MetricCard } from "../DashboardV2/MetricCard";

interface DashboardMetricCardsProps {
  data?: any;
  className?: string;
}

type MetricCard = {
  id: string;
  title: string;
  avatarImg: string;
  avatarClassName: string;
  total: string;
  subtitle?: string;
  type?: "fixed" | "percent";
};

export const CampaignMetricCards = ({
  data,
  className = "",
}: DashboardMetricCardsProps) => {
  const metricExamples: MetricCard[] = [
    {
      id: "likes",
      title: "No. of Likes",
      avatarImg: like.src,
      avatarClassName: "bg-[#14CC26]",
      total: "35,890",
      type: "fixed",
    },
    {
      id: "retweets",
      title: "No. of Retweets",
      avatarImg: retweet.src,
      avatarClassName: "bg-blue-500",
      total: "14,890",
      type: "fixed",
    },
    {
      id: "comments",
      title: "No. of Comments",
      avatarImg: comment.src,
      avatarClassName: "bg-[#EC2A90]",
      total: "35,890",
      type: "fixed",
    },
    {
      id: "impressions",
      title: "No. of Impressions",
      avatarImg: eye.src,
      avatarClassName: "bg-black",
      total: "35,890",
      type: "fixed",
    },
  ];

  return (
    <div>
      <div
        className={`grid w-full grid-cols-1 gap-4 lg:grid-cols-2 ${className}`}
      >
        {metricExamples?.length > 0 &&
          metricExamples.map((metric) => (
            <MetricCard
              key={metric.id}
              {...metric}
              className="p-4 shadow-[0px_4px_10px_rgba(1,27,56,0.14)]"
            />
          ))}
      </div>
    </div>
  );
};
