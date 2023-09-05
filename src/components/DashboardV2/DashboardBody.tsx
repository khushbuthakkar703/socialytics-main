import { useQuery } from "react-query";
import { Chart } from "./Chart";
import { DashboardMetricCards } from "./DashboardMetricCards";
import { TopNewFollowers } from "./TopNewFollowers";
import { clientGetClients } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { TweetsOverview } from "./TweetsOverview";
import { UserClient } from "@/types/UserClient";
import { ActiveCampaigns } from "./ActiveCampaigns";

interface DashboardBoyProps {
  className?: string;
  title?: string;
  data: any;
  isLoading?: boolean;
}

export const DashboardBody = ({
  className = "",
  data,
  isLoading = false,
}: DashboardBoyProps) => {
  const { data: clientsData, isLoading: clientsIsLoading } = useQuery(
    "clients",
    clientGetClients
  );

  const [clientSelected, setClientSelected] = useState<UserClient>();

  useEffect(() => {
    if (clientsData?.mainClient) setClientSelected(clientsData?.mainClient);
  }, [clientsData?.mainClient]);

  return (
    <>
      <div className="h-fit w-fit" id={"dashboard"}>
        <div className={`${className} mb-8 w-full  gap-x-7 xl:inline-flex`}>
          <Chart
            title="Followers Gained Per Day"
            className="w-full mb-7 xl:mb-0 xl:w-1/2"
            chartdata={data?.followersData}
          />
          <Chart title="Total Network Size" className="w-full xl:w-1/2" />
        </div>

        <DashboardMetricCards
          data={data}
          className="mb-8"
          isLoading={isLoading}
        />

        <ActiveCampaigns />

        {/* <TopNewFollowers data={data} loading={isLoading} /> */}
        <TweetsOverview clientSelected={clientSelected} />
      </div>
    </>
  );
};
