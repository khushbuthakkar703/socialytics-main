import { getTweets } from "@/lib/api/client";
import { UserClient } from "@/types/UserClient";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

export const useClientTweetsHistory = (
  clientSelected: UserClient | undefined,
  sizePerPage: number,
  startDate: Date,
  endDate: Date,
  actualPage: number
) => {
  const tableInitialized = useRef(false);

  const { data: clientTweetHistory, isLoading: isClientTweetHistoryLoading } =
    useQuery(
      [
        "clientTweetHistory",
        clientSelected,
        sizePerPage,
        startDate,
        endDate,
        actualPage,
      ],
      () =>
        clientSelected?.id
          ? getTweets(clientSelected.id, {
              perPage: sizePerPage,
              from: startDate.toISOString(),
              to: endDate.toISOString(),
              page: actualPage,
            })
          : null
    );

  const [cachedHistory, setCachedHistory] =
    useState<typeof clientTweetHistory>(null);

  const [cachedRowsQty, setCachedRowsQty] = useState(0);

  useEffect(() => {
    if (clientTweetHistory && !isClientTweetHistoryLoading) {
      if (!tableInitialized.current) tableInitialized.current = true;
      if (cachedHistory?.tweets) {
        setCachedHistory({
          pagination: clientTweetHistory.pagination,
          tweets: [...cachedHistory.tweets, ...clientTweetHistory.tweets],
        });
        setCachedRowsQty(cachedRowsQty + 5);
      } else {
        setCachedHistory(clientTweetHistory);
        setCachedRowsQty(5);
      }
    }
  }, [clientTweetHistory]);

  return {
    clientTweetHistory,
    isClientTweetHistoryLoading,
    cachedHistory,
    cachedRowsQty,
    tableInitialized,
  };
};
