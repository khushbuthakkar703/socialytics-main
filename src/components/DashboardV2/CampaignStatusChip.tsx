import { Badge } from "@tremor/react";
import Skeleton from "react-loading-skeleton";

interface CampaignStatusChipProps {
  statusId: string;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function CampaignStatusChip({
  statusId,
  size = "md",
  loading = false,
}: CampaignStatusChipProps) {
  const badgeOptions: {
    id: string;
    color: "lime" | "violet" | "red" | "green" | "rose" | "yellow";
    label: string;
  }[] = [
    {
      id: "ACTIVE",
      color: "green",
      label: "ACTIVE",
    },
    {
      id: "PAUSED",
      color: "violet",
      label: "PAUSED",
    },
    {
      id: "ENDED",
      color: "red",
      label: "ENDED",
    },
    {
      id: "PENDING",
      color: "yellow",
      label: "PENDING",
    },
  ];

  const status = badgeOptions.find((option) => option.id == statusId);

  return (
    <>
      {!loading ? (
        status && (
          <Badge
            size={size}
            color={status.color}
            className="max-h-9 max-w-[5.5rem] rounded-xl pt-2 font-bold"
          >
            {status.label}
          </Badge>
        )
      ) : (
        <Skeleton containerClassName="flex-1" count={1} height={30} />
      )}
    </>
  );
}
