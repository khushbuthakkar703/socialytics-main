import { CampaignResult, CampaignResults } from "./CampaignResults";
import { CampaignSetting, CampaignSettings } from "./CampaignSettings";

interface CampaignAnalyticsBodyProps {
  className?: string;
}

export const CampaignAnalyticsBody = ({
  className = "",
}: CampaignAnalyticsBodyProps) => {
  const mockedSettings: CampaignSetting[] = [
    {
      id: "currentStatus",
      label: "Current Campaign Status:",
      data: <p className="text-emerald-500">Active</p>,
    },
    {
      id: "searchQuery",
      label: "The Search Query",
      data: "1,345",
    },
    {
      id: "nLikes",
      label: "No. of Likes",
      data: "1,345",
    },
    {
      id: "nRts",
      label: "No. of Retweets",
      data: "4,500",
    },
    {
      id: "nComments",
      label: "No. of Comments",
      data: "4,500",
    },
    {
      id: "impressionRange",
      label: "Impression Range (Min - Max)",
      data: "1M - 3.5M",
    },
    {
      id: "rtPercent",
      label: "Retweet %",
      data: "50%",
    },
    {
      id: "quotePercent",
      label: "Quote %",
      data: "40%",
    },
    {
      id: "replyPercent",
      label: "No. of Likes",
      data: "40%",
    },
    {
      id: "devPercent",
      label: "Deviantion %",
      data: "40%",
    },
    {
      id: "videoViews",
      label: "Video Views %",
      data: "40%",
    },
    {
      id: "dripInitial",
      label: "Drip Initial %",
      data: "40%",
    },
    {
      id: "dripMinutes",
      label: "Drip Minutes",
      data: "30",
    },
  ];

  const mockedResults: CampaignResult[] = [
    {
      id: "tweetsEngaged",
      label: "No. of Tweets Engaged On",
      data: "5,640",
    },
    {
      id: "searchQuery",
      label: "No. of Tweets Filtered Out",
      data: "1,345",
    },
    {
      id: "nLikes",
      label: "No. of Unique Tweet Authors",
      data: "4,345",
    },
  ];

  return (
    <div className={`h-fit ${className}`}>
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-medium">Campaign Name</h2>
        <h4 className="font-gotham text-xs font-light">
          June 08 - July 15, 2023
        </h4>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-6 xl:grid-cols-2">
        {/* Settings */}
        <CampaignSettings settings={mockedSettings} />
        <CampaignResults results={mockedResults} />
        {/* Results */}
      </div>
    </div>
  );
};
