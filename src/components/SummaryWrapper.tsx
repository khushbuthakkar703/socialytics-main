import React, { forwardRef, useEffect, useState } from "react";
import Summary from "./Summary";
import ReactDatePicker from "react-datepicker";
import { RiArrowDropDownLine } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
import {
  calculatePercentageDiff,
  getTotalAndAvgNumber,
} from "@/utils/summaryFuncs";

interface SummaryType {
  followersData: Record<string, number>;
  tweetsData: Record<
    string,
    {
      count: number;
      likeCount: number;
      promotedLikeCount: number;
      quoteCount: number;
      replyCount: number;
      retweetCount: number;
      promotedRetweetCount: number;
      engagements: number;
      promotedEngagements: number;
      impressions: number;
      promotedImpressions: number;
    }
  >;
  previousPeriod: {
    totalEngagements: number;
    totalImpressions: number;
    totalTweets: number;
    totalRetweets: number;
    totalQuotes: number;
    totalReplies: number;
    totalLikes: number;
  };
}

interface SummaryWrapperProps {
  title: string;
  data: SummaryType | undefined;
  compareTo?: SummaryType;
  setCompareId: (id: string) => void;
  clientId: string;
  compareId?: string;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  isLoading?: boolean;
  compareStartDate: Date | null;
  compareEndDate: Date | null;
  setCompareStartDate: (date: Date) => void;
  setCompareEndDate: (date: Date) => void;
}

interface ClientNumbers {
  count: number;
  engagements: number;
  impressions: number;
  promotedImpressions: number;
  promotedEngagements: number;
  quoteCount: number;
  retweetCount: number;
  promotedRetweetCount: number;
  replyCount: number;
  likeCount: number;
  promotedLikeCount: number;
  avgCount: number;
  avgEngagements: number;
  avgImpressions: number;
  avgQuoteCount: number;
  avgRetweetCount: number;
  avgReplyCount: number;
  avgLikeCount: number;
  avgPromotedLikeCount: number;
  avgPromotedImpressions: number;
  avgPromotedEngagements: number;
  avgPromotedRetweets: number;
  organicLikes: number;
  avgOrganicLikes: number;
  organicRetweets: number;
  avgOrganicRetweets: number;
}

const SummaryWrapper = ({
  title,
  data,
  compareTo,
  setCompareId,
  clientId,
  compareId,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  compareStartDate,
  compareEndDate,
  setCompareStartDate,
  setCompareEndDate,
  isLoading,
}: SummaryWrapperProps) => {
  const [clientNumbers, setClientNumbers] = useState<ClientNumbers>();
  const [percentDiff, setPercentDiff] = useState<ClientNumbers>();

  useEffect(() => {
    if (data) setClientNumbers(getTotalAndAvgNumber(data));
  }, [data]);

  useEffect(() => {
    console.log(compareTo);
    if (clientNumbers && compareTo)
      setPercentDiff(
        calculatePercentageDiff(clientNumbers, getTotalAndAvgNumber(compareTo))
      );
  }, [compareTo]);

  const columns = [
    {
      Header: () => (
        <div
          style={{
            textAlign: "left",
          }}
        >
          Total
        </div>
      ),
      accessor: "heading",
      Cell: ({ row }: any) => {
        return (
          <div className="flex items-center py-6 pl-9">
            <h3 className="w-[200px] font-bold">{row.values.heading}</h3>
            <div>
              <div className="ml-14 flex justify-center gap-8">
                <span className="ml-2 block text-sm text-[#3080FE]">
                  {row.original.promotional}
                </span>{" "}
                <span className="ml-2 block text-sm text-[#EC2A90]">
                  {row.original.total}
                </span>{" "}
              </div>
              <div className="flex items-center gap-2">
                <span className="ml-2 text-sm text-gray-400">
                  {row.original.value}
                </span>{" "}
                {row.original.market && (
                  <span
                    className={`block w-[max-content] rounded-md px-2 py-1 text-center text-[13px] font-medium ${
                      row.original.down
                        ? "bg-[#F95A5A20] text-[#F95A5A]"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {row.original.market}
                  </span>
                )}
                {row.original.additional && (
                  <>
                    {row.original.additional
                      .split(" ")
                      .map((word: any, index: any) => {
                        if (word.includes("%")) {
                          return (
                            <span
                              key={index}
                              className={`block w-[max-content] rounded-md px-2 py-1 text-center text-[13px] font-medium ${
                                row.original.down
                                  ? "bg-[#F95A5A20] text-[#F95A5A]"
                                  : "bg-green-100 text-green-500"
                              }`}
                            >
                              {word}
                            </span>
                          );
                        } else {
                          return (
                            <span className="text-gray-400" key={index}>
                              {word}
                            </span>
                          );
                        }
                      })}{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const totalsData = [
    {
      heading: "Tweets:",
      value: data ? clientNumbers?.count.toLocaleString() : "",
      market: percentDiff?.count
        ? `${percentDiff.count < 0 ? "" : "+"}` +
          percentDiff?.count?.toFixed() +
          "%"
        : "",
      down: percentDiff?.count && percentDiff.count < 0,
    },
    {
      heading: "Impressions:",
      value: data ? clientNumbers?.impressions.toLocaleString() : "",
      market: percentDiff?.impressions
        ? `${percentDiff.impressions < 0 ? "" : "+"}` +
          percentDiff.impressions?.toFixed() +
          "%"
        : "",
      down: percentDiff?.impressions && percentDiff.impressions < 0,
    },
    {
      heading: "Likes:",
      value: data ? clientNumbers?.likeCount.toLocaleString() : "",
      market: percentDiff?.likeCount
        ? `${percentDiff.likeCount < 0 ? "" : "+"}` +
          percentDiff.likeCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.likeCount && percentDiff.likeCount < 0,
      additional:
        clientNumbers?.likeCount && clientNumbers.likeCount > 0
          ? `( ${clientNumbers.organicLikes ?? 0} O ${
              percentDiff?.organicLikes
                ? `${percentDiff.organicLikes < 0 ? "" : "+"}` +
                  percentDiff.organicLikes?.toFixed() +
                  "%"
                : ""
            } , ${clientNumbers.promotedLikeCount ?? 0} P ${
              percentDiff?.promotedLikeCount
                ? `${percentDiff.promotedLikeCount < 0 ? "" : "+"}` +
                  percentDiff.promotedLikeCount?.toFixed() +
                  "%"
                : ""
            } )`
          : "",
      // promotional: "PROMOTED",
      // total: "TOTAL",
    },
    {
      heading: "Retweets:",
      value: data ? clientNumbers?.retweetCount.toLocaleString() : "",
      market: percentDiff?.retweetCount
        ? `${percentDiff.retweetCount < 0 ? "" : "+"}` +
          percentDiff.retweetCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.retweetCount && percentDiff.retweetCount < 0,
      additional:
        clientNumbers?.likeCount && clientNumbers.likeCount > 0
          ? `( ${clientNumbers.organicRetweets ?? 0} O ${
              percentDiff?.organicRetweets
                ? `${percentDiff.organicRetweets < 0 ? "" : "+"}` +
                  percentDiff.organicRetweets?.toFixed() +
                  "%"
                : ""
            } , ${clientNumbers.promotedRetweetCount ?? 0} P ${
              percentDiff?.promotedRetweetCount
                ? `${percentDiff.promotedRetweetCount < 0 ? "" : "+"}` +
                  percentDiff.promotedRetweetCount?.toFixed() +
                  "%"
                : ""
            } )`
          : "",
      // promotional: "PROMOTED",
      // total: "TOTAL",
    },
    {
      heading: "Comments",
      value: data ? clientNumbers?.replyCount.toLocaleString() : "",
      market: percentDiff?.replyCount
        ? `${percentDiff.replyCount < 0 ? "" : "+"}` +
          percentDiff.replyCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.replyCount && percentDiff.replyCount < 0,
    },
  ];
  const avgsData = [
    {
      heading: "Tweets:",
      value:
        data && clientNumbers?.avgCount
          ? clientNumbers.avgCount.toLocaleString()
          : "0",
      market: percentDiff?.avgCount
        ? `${percentDiff.avgCount < 0 ? "" : "+"}` +
          percentDiff?.avgCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.avgCount && percentDiff.avgCount < 0,
    },
    {
      heading: "Impressions:",
      value:
        data && clientNumbers?.avgImpressions
          ? clientNumbers.avgImpressions.toLocaleString()
          : "0",
      market: percentDiff?.avgImpressions
        ? `${percentDiff.avgImpressions < 0 ? "" : "+"}` +
          percentDiff.avgImpressions?.toFixed() +
          "%"
        : "",
      down: percentDiff?.avgImpressions && percentDiff.avgImpressions < 0,
    },
    {
      heading: "Likes:",
      value:
        data && clientNumbers?.avgLikeCount
          ? clientNumbers.avgLikeCount.toLocaleString()
          : "0",
      market: percentDiff?.avgLikeCount
        ? `${percentDiff.avgLikeCount < 0 ? "" : "+"}` +
          percentDiff.avgLikeCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.avgLikeCount && percentDiff.avgLikeCount < 0,
      additional:
        clientNumbers?.avgLikeCount && clientNumbers.avgLikeCount > 0
          ? `( ${clientNumbers.avgOrganicLikes ?? 0} O ${
              percentDiff?.avgOrganicLikes
                ? `${percentDiff.avgOrganicLikes < 0 ? "" : "+"}` +
                  percentDiff.avgOrganicLikes?.toFixed() +
                  "%"
                : ""
            } , ${clientNumbers.avgPromotedLikeCount ?? 0} P ${
              percentDiff?.avgPromotedLikeCount
                ? `${percentDiff.avgPromotedLikeCount < 0 ? "" : "+"}` +
                  percentDiff.avgPromotedLikeCount?.toFixed() +
                  "%"
                : ""
            } )`
          : "",
      // promotional: "PROMOTED",
      // total: "TOTAL",
    },
    {
      heading: "Retweets:",
      value:
        data && clientNumbers?.avgRetweetCount
          ? clientNumbers.avgRetweetCount.toLocaleString()
          : "0",
      market: percentDiff?.avgRetweetCount
        ? `${percentDiff.avgRetweetCount < 0 ? "" : "+"}` +
          percentDiff.avgRetweetCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.avgRetweetCount && percentDiff.avgRetweetCount < 0,
      additional:
        clientNumbers?.avgRetweetCount && clientNumbers.avgRetweetCount > 0
          ? `( ${clientNumbers.avgOrganicRetweets ?? 0} O ${
              percentDiff?.avgOrganicRetweets
                ? `${percentDiff.avgOrganicRetweets < 0 ? "" : "+"}` +
                  percentDiff.avgOrganicRetweets?.toFixed() +
                  "%"
                : ""
            } , ${clientNumbers.avgPromotedRetweets ?? 0} P ${
              percentDiff?.avgPromotedRetweets
                ? `${percentDiff.avgPromotedRetweets < 0 ? "" : "+"}` +
                  percentDiff.avgPromotedRetweets?.toFixed() +
                  "%"
                : ""
            } )`
          : "",
      // promotional: "PROMOTED",
      // total: "TOTAL",
    },
    {
      heading: "Comments",
      value:
        data && clientNumbers?.avgReplyCount
          ? clientNumbers.avgReplyCount.toLocaleString()
          : "0",
      market: percentDiff?.avgReplyCount
        ? `${percentDiff.avgReplyCount < 0 ? "" : "+"}` +
          percentDiff.avgReplyCount?.toFixed() +
          "%"
        : "",
      down: percentDiff?.avgReplyCount && percentDiff.avgReplyCount < 0,
    },
  ];

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const CustomInput = forwardRef(function customInput(
    { value, onClick }: any,
    ref: any
  ) {
    return (
      <div>
        <input
          className="inline-block w-fit cursor-pointer rounded-xl bg-[#D6EFFF] py-1.5 pr-5 text-start font-bold text-[#3080FE] placeholder-blue-500 outline-blue-400 sm:text-center"
          type="text"
          placeholder="Add date"
          defaultValue={value}
          onClick={onClick}
          ref={ref}
        />
        <div className="pointer-events-none absolute inset-y-0 right-[12px] flex items-center ">
          <RiArrowDropDownLine color="#3080FE" size={24} />
        </div>
      </div>
    );
  });

  const getMaxDate = (dates: string[]) => {
    return dates.reduce((mostRecent, item) =>
      item > mostRecent ? item : mostRecent
    );
  };

  return (
    <>
      <div className="mt-10 rounded-[12px] p-3 shadow-[0_0_14px_rgb(0,0,0,0.1)] sm:p-6">
        <div className="flex flex-wrap items-center justify-start border-b pb-4 sm:justify-between">
          <p className="mb-3 mr-auto pl-0 text-[20px] font-semibold sm:mb-0 sm:text-[24px] md:pl-10">
            {title}
          </p>
          <div className="w-fit cursor-pointer">
            <ReactDatePicker
              dateFormat="(MM/dd)"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              customInput={<CustomInput />}
              maxDate={new Date()}
            />
          </div>
        </div>
        <div className="py-5' grid grid-cols-1 gap-4 sm:gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          <Summary
            hideDropdown
            title="Total"
            summaryTitle={
              data?.followersData[
                getMaxDate(Object.keys(data.followersData))
              ]?.toLocaleString() ?? "-"
            }
            columns={columns}
            data={totalsData}
            loading={isLoading}
          />
          <Summary
            title="Average"
            summaryTitle={"Compare to: "}
            columns={columns}
            data={avgsData}
            clientId={clientId}
            setCompareId={setCompareId}
            compareId={compareId}
            compareStartDate={compareStartDate}
            compareEndDate={compareEndDate}
            setCompareStartDate={setCompareStartDate}
            setCompareEndDate={setCompareEndDate}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default SummaryWrapper;
