import React from "react";
import { Avatar } from "./Avatar";
import { Tooltip } from "./Tooltip";
import { FollowerData } from "./TopNewFollowers";
import * as Separator from "@radix-ui/react-separator";
import Skeleton from "react-loading-skeleton";

interface CardTopNewFollowerProps {
  data: FollowerData;
  loading?: boolean;
}

interface NewFollowerInfoProps {
  property: string | JSX.Element;
  data: string | string[];
  dataClassName?: string;
  loading?: boolean;
}

const NewFollowerInfo = ({
  property,
  data,
  dataClassName = "",
  loading = false,
}: NewFollowerInfoProps) => {
  const stringifyData = Array.isArray(data) ? data.join(", ") : data;
  return (
    <div className="mb-6 grid w-full grid-cols-5 gap-x-12 px-5 text-[#011B38]">
      <div className="col-span-2 font-light text-gray-500 dark:text-gray-400">
        {(!loading && property) || <Skeleton />}
      </div>
      <p
        className={`col-span-3 ml-4 font-medium ${
          dataClassName.length > 0 ? dataClassName : "dark:text-white "
        }`}
      >
        {(!loading && stringifyData) || <Skeleton />}
      </p>
    </div>
  );
};

export const CardTopNewFollower = ({
  data,
  loading = false,
}: CardTopNewFollowerProps) => {
  const followerProperties = [
    {
      property: "Followers/Following",
      data: `${data.followers}/${data.following}`,
    },
    {
      property: "Followed Date",
      data: data.followedDate,
    },
    {
      property: "Following Ratio",
      data: data.followingRatio,
    },
    {
      property: (
        <div className="inline-flex gap-x-2">
          Quality Score{" "}
          {
            <Tooltip
              content={
                <React.Fragment>
                  <span className="font-[600] italic">Quality Score</span>{" "}
                  indicates the value of this account based on our internal
                  algorithms.
                </React.Fragment>
              }
            />
          }
        </div>
      ),
      propertyName: "Quality score",
      data: data.qualityScore,
      dataClassName: "text-[#F52D56] dark:text-[#F52D56]",
    },
    {
      property: "Circles",
      data: data.circles,
      dataClassName: "text-[#03DE73] dark:text-[#03DE73]",
    },
  ];

  return (
    <div className="relative grid grid-cols-3 px-8 pt-12 odd:border-r">
      <div className="mb-16 grid max-w-[12rem] grid-cols-1 justify-items-center xl:ml-8 2xl:ml-0">
        {!loading ? (
          <>
            {" "}
            <Avatar
              imageUrl={data.profileImg}
              maxHeight={"12rem"}
              maxWidth={"12rem"}
              className="mb-7"
            />
            <a
              href={`https://twitter.com/${data.username}`}
              className="text-lg underline"
            >
              {data.username}
            </a>
          </>
        ) : (
          <>
            <Skeleton className="mb-7 min-h-[12rem] min-w-[12rem] rounded-lg" />
            <Skeleton className="min-h-5 min-w-[10rem] " />
          </>
        )}
      </div>
      <div className="col-span-2 ">
        {followerProperties &&
          followerProperties.map((item) => {
            return (
              <NewFollowerInfo
                key={
                  typeof item.property == "string"
                    ? item.property
                    : item.propertyName
                }
                property={item.property}
                data={item.data}
                dataClassName={item.dataClassName}
                loading={loading}
              />
            );
          })}
      </div>
      <Separator.Root className="absolute bottom-0 col-span-3 justify-self-center bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[90%] " />
    </div>
  );
};
