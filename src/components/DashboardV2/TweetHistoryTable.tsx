import { safeNewDate } from "@/utils/dateFuncs";
import Table from "./Table";
import { useMemo } from "react";
import { ClientsTweetHistory } from "@/lib/api/types";
interface TweetHistoryTableProps {
  data: ClientsTweetHistory | null | undefined;
  loading?: boolean;
  skeletonSize?: number;
  className?: string;
  cachedRowsQty: number;
  moreLoading?: boolean;
}

export const TweetHistoryTable = ({
  data,
  loading = false,
  skeletonSize = 5,
  className = "",
  cachedRowsQty = 0,
  moreLoading = false,
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
            {row?.values?.createdAt
              ? safeNewDate(row.values.createdAt).toLocaleDateString()
              : null}
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
    () =>
      loading
        ? !moreLoading
          ? Array(skeletonSize).fill({})
          : data
          ? [...data, ...Array(skeletonSize).fill({})]
          : Array(skeletonSize).fill({})
        : data,
    [loading, data, moreLoading]
  );
  const tableColumns = useMemo(() => columns, [loading, columns, moreLoading]);

  return (
    <div className={className}>
      {tableData && tableColumns && (
        <Table
          columns={tableColumns}
          data={tableData}
          nonLoadingRows={cachedRowsQty}
          className="max-h-[45rem] overflow-y-auto"
          stickyHeader
        />
      )}
    </div>
  );
};
