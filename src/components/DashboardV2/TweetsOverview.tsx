import { Button } from "@tremor/react";
import { TweetHistoryTable } from "./TweetHistoryTable";
import { MouseEvent, useState } from "react";
import { useClientTweetsHistory } from "@/hooks/useClientTweetsHistory";
import { UserClient } from "@/types/UserClient";

interface TweetsOverviewProps {
  clientSelected?: UserClient;
}

export const TweetsOverview = ({ clientSelected }: TweetsOverviewProps) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 29))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [actualPage, setActualPage] = useState(0);
  const SIZE_PER_PAGE = 5;

  const {
    isClientTweetHistoryLoading,
    cachedHistory,
    cachedRowsQty,
    tableInitialized,
  } = useClientTweetsHistory(
    clientSelected,
    SIZE_PER_PAGE,
    startDate,
    endDate,
    actualPage
  );

  const handleAddMore = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActualPage(actualPage + 1);
  };

  return (
    <div className="mt-8 rounded-xl border bg-white py-9 font-gotham shadow-[0px_0px_14px_rgba(1,27,56,0.1)] dark:bg-inherit">
      <p className="mb-8 px-8 text-2xl font-medium">Tweets Overview</p>
      <TweetHistoryTable
        data={cachedHistory?.tweets}
        loading={isClientTweetHistoryLoading}
        skeletonSize={SIZE_PER_PAGE}
        className="mb-8 px-8 text-sm font-light"
        cachedRowsQty={cachedRowsQty}
        moreLoading={isClientTweetHistoryLoading && tableInitialized.current}
      />
      <div className="flex justify-center">
        <Button
          color="blue"
          variant="light"
          size="xl"
          className="text-lg font-medium"
          onClick={handleAddMore}
          loading={isClientTweetHistoryLoading}
        >
          {isClientTweetHistoryLoading ? "Loading..." : "Show More Tweets"}
        </Button>
      </div>
    </div>
  );
};
