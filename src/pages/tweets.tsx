import { useState, forwardRef, useEffect } from "react";
import Layout from "../components/layout";
import MainMetricCard from "@/components/MainMetricCard";
import Dropdown from "@/components/Dropdown";
import { TweetHistoryTable } from "@/components/TweetHistoryTable";
import { useQuery } from "react-query";
import { useAuth } from "@/lib/stytch/useAuth";
import {
  clientGetClients,
  getClientSummary,
  getSummary,
  getTweets,
} from "@/lib/api/client";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Pagination } from "@/components/Pagination";
import { ReqSizeDropdown } from "@/components/ReqSizeDropdown";
import { nFormatter } from "@/lib/stytch/utils";
import Loader from "@/components/Loader";

interface UserClient {
  id: string;
  name: string;
}

export default function IndexPage() {
  const loading = status === "loading";
  const auth = useAuth();

  const { data: clientsData, isLoading: clientsIsLoading } = useQuery(
    "clients",
    clientGetClients
  );

  const [clientSelected, setClientSelected] = useState<UserClient>();

  useEffect(() => {
    if (clientsData?.mainClient) setClientSelected(clientsData?.mainClient);
  }, [clientsData?.mainClient]);

  const handleSelected = (client: UserClient) => {
    setActualPage(0);
    setClientSelected(client);
  };

  const CHART_WIDTH = "125";
  const CHART_HEIGHT = "82";

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 29))
  );
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [sizePerPage, setSizePerPage] = useState(10);
  const [actualPage, setActualPage] = useState(0);
  const handleSizePerPage = (size: { label: string; value: number }) => {
    setActualPage(0);
    setSizePerPage(size.value);
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
  const { data: clientSummary, isLoading: isClientSummaryLoading } = useQuery(
    ["clientSummary", clientSelected?.id, startDate, endDate],
    () =>
      clientSelected?.id
        ? getClientSummary(
            clientSelected.id,
            startDate.toISOString(),
            endDate.toISOString()
          )
        : null
  );

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (!clientSelected) return <Loader />;
  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <Layout>
      <div className="my-6 flex gap-4">
        <div>
          <Dropdown
            defaultSelected={clientsData?.mainClient}
            showSelected={true}
            itemKey="id"
            valueKey="name"
            data={clientsData?.clients}
            handleSelected={handleSelected}
          />
        </div>
        <div>
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
        <div className="ml-auto">
          <Dropdown
            title="Export as..."
            // data={dropdown}
            handleSelected={handleSelected}
            bgcolor="red"
            textcolor="green"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <MainMetricCard
          title={"Tweets"}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary?.tweetsData).map(
                    ([date, data], index, arr) => [
                      date,
                      index === 0
                        ? data.count
                        : data.count +
                          arr
                            .slice(0, index)
                            .reduce((sum, [, d]) => sum + d.count, 0),
                    ]
                  )
                )
              : {}
          }
          compareTo={clientSummary?.previousPeriod?.totalTweets}
          isLoading={isClientSummaryLoading}
          numberType="last"
          subtitle="Total Tweets over this Time Period"
        />
        <MainMetricCard
          title={"Quotes"}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary?.tweetsData).map(
                    ([date, data], index, arr) => [
                      date,
                      index === 0
                        ? data.quoteCount
                        : data.quoteCount +
                          arr
                            .slice(0, index)
                            .reduce((sum, [, d]) => sum + d.quoteCount, 0),
                    ]
                  )
                )
              : {}
          }
          compareTo={clientSummary?.previousPeriod?.totalQuotes}
          isLoading={isClientSummaryLoading}
          numberType="sum"
          subtitle="Total Quote Tweets over this Time Period"
        />
        <MainMetricCard
          title={"Replies"}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary?.tweetsData).map(
                    ([date, data], index, arr) => [
                      date,
                      index === 0
                        ? data.replyCount
                        : data.replyCount +
                          arr
                            .slice(0, index)
                            .reduce((sum, [, d]) => sum + d.replyCount, 0),
                    ]
                  )
                )
              : {}
          }
          compareTo={clientSummary?.previousPeriod?.totalReplies}
          isLoading={isClientSummaryLoading}
          numberType="last"
          subtitle="Total Reply Tweets over this Time Period"
        />
        <MainMetricCard
          title={"Impressions"}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary.tweetsData)
                    .filter(([, data]) => data.impressions > 0)
                    .map(([date, data]) => [date, data.impressions])
                )
              : {}
          }
          promotedText={`${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) => obj + item.promotedImpressions,
              0
            )
          )} P / ${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) =>
                obj + (item.impressions - item.promotedImpressions),
              0
            )
          )} O`}
          compareTo={clientSummary?.previousPeriod?.totalImpressions}
          isLoading={isClientSummaryLoading}
          numberType="sum"
          subtitle="Total Impressions over Last 30 Days"
        />
        <MainMetricCard
          title={"Likes"}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary?.tweetsData).map(
                    ([date, data], index, arr) => [
                      date,
                      index === 0
                        ? data.likeCount
                        : data.likeCount +
                          arr
                            .slice(0, index)
                            .reduce((sum, [, d]) => sum + d.likeCount, 0),
                    ]
                  )
                )
              : {}
          }
          promotedText={`${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) => obj + item.promotedLikeCount,
              0
            )
          )} P / ${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) => obj + (item.likeCount - item.promotedLikeCount),
              0
            )
          )} O`}
          compareTo={clientSummary?.previousPeriod?.totalLikes}
          isLoading={isClientSummaryLoading}
          numberType="last"
          subtitle="Total Reply Tweets over this Time Period"
        />
        <MainMetricCard
          title={"Retweets"}
          promotedText={`${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) => obj + item.promotedRetweetCount,
              0
            )
          )} P / ${nFormatter(
            Object.values(clientSummary?.tweetsData ?? {}).reduce(
              (obj, item) =>
                obj + (item.retweetCount - item.promotedRetweetCount),
              0
            )
          )} O`}
          data={
            clientSummary?.tweetsData
              ? Object.fromEntries(
                  Object.entries(clientSummary?.tweetsData).map(
                    ([date, data], index, arr) => [
                      date,
                      index === 0
                        ? data.retweetCount
                        : data.retweetCount +
                          arr
                            .slice(0, index)
                            .reduce((sum, [, d]) => sum + d.retweetCount, 0),
                    ]
                  )
                )
              : {}
          }
          compareTo={clientSummary?.previousPeriod?.totalRetweets}
          isLoading={isClientSummaryLoading}
          numberType="last"
          subtitle="Total Reply Tweets over this Time Period"
        />
      </div>
      <div className="mt-7 rounded-[12px] p-6 shadow-[0_0_14px_rgb(0,0,0,0.1)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="py-3 text-2xl  font-bold">All Tweets</h3>
          <ReqSizeDropdown handleSize={handleSizePerPage} />
        </div>
        <TweetHistoryTable
          data={clientTweetHistory?.tweets}
          loading={isClientTweetHistoryLoading}
          skeletonSize={sizePerPage}
        />
        {clientTweetHistory &&
        clientTweetHistory?.pagination.totalRecords > 0 ? (
          <Pagination
            setActualPage={setActualPage}
            page={actualPage}
            totalPages={clientTweetHistory.pagination.totalPages}
          />
        ) : null}
      </div>
    </Layout>
  );
}
