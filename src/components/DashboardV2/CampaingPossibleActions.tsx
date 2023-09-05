import Skeleton from "react-loading-skeleton";
import { CampaignAction } from "./CampaignAction";

interface CampaignPossibleActionsProps {
  status: string;
  loading?: boolean;
}

type actions = "play" | "pause" | "cancel";

export default function CampaignPossibleActions({
  status,
  loading = false,
}: CampaignPossibleActionsProps) {
  const possibleActionsPerStatus: Array<Record<string, actions[]>> = [
    { ACTIVE: ["pause", "cancel"] },
    { PAUSED: ["play", "cancel"] },
  ];

  return (
    <>
      {!loading ? (
        <div className="mx-auto flex w-max flex-row gap-x-9">
          {status && status !== "ENDED" ? (
            possibleActionsPerStatus
              .find((item) => Object.keys(item)[0] === status)
              ?.[status]?.map((action) => (
                <div key={action} className="shrink-0">
                  <CampaignAction
                    key={action}
                    type={action}
                    className={action == "play" ? "bg-[#3080FE]" : undefined}
                  />
                </div>
              ))
          ) : (
            <div className="m-0 w-max">Your campaign has ended</div>
          )}
        </div>
      ) : (
        <Skeleton containerClassName="xl:ml-7" count={1} height={30} />
      )}
    </>
  );
}
