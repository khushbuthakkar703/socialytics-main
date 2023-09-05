import { safeNewDate } from "@/utils/dateFuncs";
import Table from "./Table";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";

interface TweetHistoryTableProps {
  data: any;
  loading?: boolean;
  skeletonSize?: number;
}

export const TweetHistoryTable = ({
  data,
  loading = false,
  skeletonSize = 10,
}: TweetHistoryTableProps) => {
  const columns = [
    {
      Header: "Tweet",
      accessor: "text",
      Cell: ({ row }: any) => {
        return (
          <div className="m-auto w-[25rem] px-4 py-4 text-center">
            {row.values.text}
          </div>
        );
      },
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-6 text-center">
            {safeNewDate(row.values.createdAt).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ row }: any) => {
        let type = "Tweet";
        if (row.original.isRetweet) type = "Retweet";
        else if (row.original.isReplyTweet) type = "Reply";
        else if (row.original.isQuoteTweet) type = "Quote";
        return <div className="px-4 py-4 text-center">{type}</div>;
      },
    },
    {
      Header: "Url",
      accessor: "url",
      Cell: ({ row }: any) => {
        return (
          <div className="px-4 py-4 text-center">
            <a
              href={row.values.url}
              className="mx-auto block w-[11.25rem] break-all"
            >
              {row.values.url}
            </a>
          </div>
        );
      },
    },
    {
      Header: "Impressions",
      accessor: "impressions",
      Cell: ({ row }: any) => {
        return !row.original.isRetweet ? (
          <div
            className={`text-green px-4 py-4 text-center ${
              // row.values.growth < 0 ? "text-red-500" : "text-green-500"
              ""
            } `}
          >
            {row.values?.impressions?.toLocaleString("en-US") ?? 0}
          </div>
        ) : null;
      },
    },
    {
      Header: "Likes (O/P)",
      accessor: "totalLikes",
      Cell: ({ row }: any) => {
        return !row.original.isRetweet ? (
          <>
            <div className="px-4 text-center">{row.values.totalLikes ?? 0}</div>
            <div className="text-gray px-4 text-center text-gray-500">{`${row.original.organicLikes}/${row.original.promotedLikes}`}</div>
          </>
        ) : null;
      },
    },
    {
      Header: "Retweets (O/P)",
      accessor: "totalRetweets",
      Cell: ({ row }: any) => {
        return !row.original.isRetweet ? (
          <>
            <div className="px-4 text-center">
              {row.values.totalRetweets ?? 0}
            </div>
            <div className="text-gray px-4 text-center text-gray-500">{`${row.original.organicRetweets}/${row.original.promotedRetweets}`}</div>
          </>
        ) : null;
      },
    },
  ];

  const tableData = useMemo(
    () => (loading ? Array(skeletonSize).fill({}) : data),
    [loading, data]
  );
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column, index) => ({
            ...column,
            Cell: () => (
              <div className={`p-[1rem] ${index == 0 ? "min-w-[18rem]" : ""}`}>
                <Skeleton className={`min-h-[3rem] min-w-full`} />
              </div>
            ),
          }))
        : columns,
    [loading, columns]
  );

  return (
    <>
      {tableData && tableColumns && (
        <Table columns={tableColumns} data={tableData} />
      )}
    </>
  );
};
