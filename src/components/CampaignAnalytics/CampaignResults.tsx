import { ReactNode } from "react";
import OptionsButton from "../DashboardV2/OptionsButton";
import { CampaignMetricCards } from "./CampaignMetricCards";

export interface CampaignResult {
  id: string;
  label: string;
  data: number | string | ReactNode;
}

interface CampaignResultsProps {
  results?: CampaignResult[];
}

export const CampaignResults = ({ results }: CampaignResultsProps) => {
  return (
    <div className="mb-4 w-full rounded-xl bg-white px-4 pt-7 dark:border-2 dark:bg-inherit">
      <div className="mb-4 flex flex-row justify-between">
        <h5 className="text-xl font-semibold">Campaign Results</h5>
        <OptionsButton />
      </div>
      <div className="mb-9">
        {results &&
          results.length > 0 &&
          results.map((setting) => (
            <div
              key={setting.id}
              className="align-center mb-4 flex w-full flex-row justify-between text-sm"
            >
              <div className="pt-1 font-gotham font-light">{setting.label}</div>
              <div className=" font-semibold">{setting.data}</div>
            </div>
          ))}
      </div>
      <div className="mb-9">
        <h5 className="mb-4 text-xl font-semibold">
          Combined Total Metrics of All Tweets Engaged On:
        </h5>
        <CampaignMetricCards />
      </div>
      <div className="mb-7">
        <h5 className="mb-4 text-xl font-semibold">
          Combined Total Metrics of All Comments From Us
        </h5>
        <div className="mx-24 rounded-xl bg-sky-200 py-3 text-center font-semibold text-black">
          <div>Coming Soon...</div>
        </div>
      </div>
    </div>
  );
};
