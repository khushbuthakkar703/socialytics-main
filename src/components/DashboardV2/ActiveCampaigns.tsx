import { Button } from "@tremor/react";
import { ActiveCampaignsTable } from "./ActiveCampaignsTable";
import { ClientActiveCampaigns } from "@/lib/api/types";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  getActiveCampaigns,
  getCampaignStatuses,
  userGetCampaigns,
} from "@/lib/api/client";
import { safeNewDate } from "@/utils/dateFuncs";

interface ActiveCampaignsProps {
  title?: string;
}

export const ActiveCampaigns = ({
  title = "Active Campaigns",
}: ActiveCampaignsProps) => {
  const PAGE_ROWS_QTY = 4;
  const [activeCampaigns, setActiveCampaigns] = useState<ClientActiveCampaigns>(
    []
  );
  const {
    data: campaigns,
    isLoading: isActiveCampaignsLoading,
    isError: isCampaignsError,
  } = useQuery("campaigns", userGetCampaigns);

  const { data: campaignStatuses, isLoading: isCampaignStatusesLoading } =
    useQuery("campaignStatuses", getCampaignStatuses);

  const [showMoreAvailable, setShowMoreAvailable] = useState(false);

  const showMoreCampaigns = () => {
    if (
      campaigns &&
      campaigns.length > 0 &&
      (activeCampaigns.length == 0 || showMoreAvailable)
    ) {
      const minIndex = activeCampaigns.length;
      const maxIndex =
        activeCampaigns.length + PAGE_ROWS_QTY < campaigns.length
          ? activeCampaigns.length + PAGE_ROWS_QTY - 1
          : campaigns.length;
      const newCampaigns =
        minIndex == maxIndex
          ? [campaigns[maxIndex]]
          : campaigns.slice(minIndex, maxIndex);
      const goingToAdd: ClientActiveCampaigns = newCampaigns.map(
        (campaign) => ({
          id: campaign.id,
          name: campaign.searchQuery,
          startDate: campaign?.startDate
            ? safeNewDate(campaign.startDate as string).toLocaleDateString()
            : "-",
          endDate: campaign?.endDate
            ? safeNewDate(campaign.endDate as string).toLocaleDateString()
            : "-",
          status:
            campaignStatuses?.find(
              (campaignStatus) => campaignStatus.id == campaign.id
            )?.status ?? "",
        })
      );
      setActiveCampaigns([...activeCampaigns, ...goingToAdd]);
    }
  };

  useEffect(() => {
    if (campaignStatuses && !isCampaignStatusesLoading) {
      setActiveCampaigns(
        activeCampaigns.map((campaign) => ({
          ...campaign,
          status:
            campaignStatuses.find(
              (campaignStatus) => campaignStatus.id == campaign.id
            )?.status ?? "",
        }))
      );
    }
  }, [campaignStatuses]);

  useEffect(() => {
    if (campaigns && !isActiveCampaignsLoading && activeCampaigns.length == 0) {
      showMoreCampaigns();
    }
  }, [campaigns]);

  useEffect(() => {
    if (
      campaigns &&
      !isActiveCampaignsLoading &&
      activeCampaigns.length < campaigns.length
    )
      setShowMoreAvailable(true);
    else setShowMoreAvailable(false);
  }, [activeCampaigns]);

  return (
    <div className="mb-8 mt-8 rounded-xl border bg-white py-9 shadow-[0px_0px_14px_rgba(1,27,56,0.1)] dark:bg-inherit">
      <div className={"mb-8 flex w-full items-center justify-between px-8"}>
        <p className="font-gotham text-2xl font-medium">{title}</p>
        <Button color="pink" size="sm" className="mr-4 font-[600]">
          Excel Export
        </Button>
      </div>
      {activeCampaigns.length == 0 && !isCampaignStatusesLoading ? (
        isCampaignsError ? (
          <div className="w-full justify-self-center text-center">
            There was an error. Try again later.
          </div>
        ) : (
          <div className="w-full justify-self-center text-center">
            You do not have any campaigns yet
          </div>
        )
      ) : (
        <ActiveCampaignsTable
          data={activeCampaigns}
          loading={false}
          moreLoading={false}
          className="mb-8 px-8 font-gotham text-sm font-light"
          loadingStatus={isCampaignStatusesLoading}
        />
      )}

      {showMoreAvailable && (
        <div className="flex justify-center">
          <Button
            color="blue"
            variant="light"
            size="xl"
            className="font-gotham text-lg font-medium"
            onClick={showMoreCampaigns}
            loading={isActiveCampaignsLoading || isCampaignStatusesLoading}
          >
            Show More Campaigns
          </Button>
        </div>
      )}
    </div>
  );
};
