import React, { useEffect, useState } from "react";
import { Bold, Icon, Metric, Text } from "@tremor/react";
import { LinkIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Pagination } from "@/components/Pagination";
import { getTweetsMetrics } from "@/lib/api/client";
import Skeleton from "react-loading-skeleton";

function MinichartTable(props: any) {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (props.data === "Average Engagements per Tweet") {
        const response = await getTweetsMetrics(
          "summary/v2/charts/engagements",
          page
        );
        console.log(response);
        setData(response);
      }
      if (props.data === "Average Impressions per Tweet") {
        const response = await getTweetsMetrics(
          "summary/v2/charts/impressions",
          page
        );
        setData(response);
      }
      if (props.data === "Average Organics Engagements") {
        const response = await getTweetsMetrics(
          "summary/v2/charts/oengagements",
          page
        );
        setData(response);
      }
      if (props.data === "Average Promoted Engagements") {
        const response = await getTweetsMetrics(
          "summary/v2/charts/pengagements",
          page
        );
        setData(response);
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [page]);

  const returnPercent = () => {
    if (props.data.includes("Organic") || props.data.includes("Promoted")) {
      return "%";
    } else {
      return "";
    }
  };

  const returnTitle = () => {
    if (props.data === "Average Engagements per Tweet") {
      return "Engagements";
    }
    if (props.data === "Average Impressions per Tweet") {
      return "Impressions";
    }
    if (props.data === "Average Organics Engagements") {
      return "% ORGANIC ENGAGEMENT";
    }
    if (props.data === "Average Promoted Engagements") {
      return "% PROMOTED ENGAGEMENT";
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-[100vh] w-full items-center justify-center bg-gray-600 bg-opacity-40">
      <div className="h-fit max-h-[80%] w-full max-w-screen-lg rounded-2xl bg-white p-10">
        <div className="mb-10 flex flex-1 items-center justify-between">
          <Metric>{props.data}</Metric>

          <Icon
            size="lg"
            icon={XCircleIcon}
            className="cursor-pointer opacity-50 hover:opacity-100"
            color="gray"
            onClick={props.handleModal}
          />
        </div>

        <div className="flex-9 flex flex-col  gap-1">
          <div className="flex rounded-lg bg-blue-500 p-4 text-left text-white">
            <div className="flex w-[15%] items-center justify-start">
              <Bold>DATE</Bold>
            </div>
            <div className="w-[65%] flex items-center justify-start">
              <Bold> TWEET</Bold>
            </div>
            <div className="w-[10%] flex items-center justify-start">
              <Bold> LINK</Bold>
            </div>
            <div className="w-[10%] flex items-center justify-start">
              <Bold> {returnTitle()}</Bold>
            </div>
          </div>

          {isLoading && (
            <Skeleton
              count={5}
              className="flex text-left  text-white px-4 rounded-xl h-[75px]"
            />
          )}
          {!isLoading &&
            data?.tweets?.map((tweet: any) => (
              <div
                className="flex text-left  text-white px-4 rounded-xl h-[75px]"
                key={tweet.id}
              >
                <div className="w-[15%] flex items-center justify-start  p-2">
                  <Text>{formatDate(tweet.createdAt)}</Text>
                </div>
                <div className="w-[65%] flex items-center justify-start  p-2">
                  <Text>{truncateText(tweet.text, 240)}</Text>
                </div>
                <div className="w-[10%] flex items-center justify-start p-2">
                  <a
                    href={tweet.url}
                    rel={"noreferrer"}
                    target={"_blank"}
                    className="text-blue-400"
                  >
                    <Icon size="xs" icon={LinkIcon} />
                  </a>
                </div>
                <div className="w-[10%] flex items-center justify-start  p-2">
                  <Text>
                    {" "}
                    {tweet.total || 0}
                    {returnPercent()}
                  </Text>
                </div>
              </div>
            ))}
          <Pagination
            page={page}
            setActualPage={setPage}
            totalPages={data?.pagination?.totalRecords / 5 ?? 0}
          />
        </div>
      </div>
    </div>
  );
}

export default MinichartTable;
