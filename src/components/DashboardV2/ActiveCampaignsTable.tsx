import { safeNewDate } from "@/utils/dateFuncs";
import { ClientActiveCampaigns } from "@/lib/api/types";
import { Button } from "@tremor/react";
import { DataTable } from "./DataTable";
import CampaignStatusChip from "./CampaignStatusChip";
import { CampaignAction } from "./CampaignAction";
import CampaignPossibleActions from "./CampaingPossibleActions";
import { useEffect, useState } from "react";

interface ActiveCampaignsTableProps {
  data: ClientActiveCampaigns | null | undefined;
  loading?: boolean;
  skeletonSize?: number;
  className?: string;
  cachedRowsQty?: number;
  moreLoading?: boolean;
  loadingStatus?: boolean;
}

export const ActiveCampaignsTable = ({
  data,
  loading = false,
  skeletonSize = 5,
  className = "",
  cachedRowsQty = 0,
  moreLoading = false,
  loadingStatus = false,
}: ActiveCampaignsTableProps) => {
  const columns = [
    {
      Header: "Campaign Name",
      accessor: "name",
      Cell: ({ row }: any) => {
        return <div className=" px-4 py-4 text-center">{row.values.name}</div>;
      },
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-6 text-center">
            {/* {row?.values?.startDate
              ? safeNewDate(row.values.startDate).toLocaleDateString()
              : null} */}
            {row?.values?.startDate}
          </div>
        );
      },
    },
    {
      Header: "End Date",
      accessor: "endDate",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-6 text-center">
            {/* {row?.values?.endDate
              ? safeNewDate(row.values.endDate).toLocaleDateString()
              : null} */}
            {row?.values?.endDate}
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-4 text-center ">
            <CampaignStatusChip
              statusId={row?.values?.status}
              loading={loadingStatus}
              size="md"
            />
          </div>
        );
      },
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: ({ row }: any) => {
        return (
          <div className=" w-full max-w-[140px] px-4 py-4">
            <CampaignPossibleActions
              loading={loadingStatus}
              status={row?.values?.status}
            />
          </div>
        );
      },
    },
    {
      Header: "Analytics",
      id: "analytics",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-4 text-center">
            <Button
              color="blue"
              variant="light"
              size="xl"
              className="text-lg font-medium"
              //   onClick={handleViewAnalytics}
            >
              View analytics
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={data}
      loading={loading}
      skeletonSize={skeletonSize}
      className={className}
      cachedRowsQty={data?.length ?? 0}
      moreLoading={moreLoading}
      columns={columns}
    />
  );
};
