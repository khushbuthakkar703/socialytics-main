import { Button } from "@tremor/react";
import { CardTopNewFollower } from "./CardTopNewFollower";
import { useState } from "react";

interface TopNewFollowersProps {
  data?: any;
  loading?: boolean;
}

export interface FollowerData {
  id: string;
  profileImg: string;
  username: string;
  followers: string;
  following: string;
  followedDate: string;
  followingRatio: string;
  qualityScore: string;
  circles: string[];
}

export const TopNewFollowers = ({
  data,
  loading = false,
}: TopNewFollowersProps) => {
  const mockedFollowers: FollowerData[] = [
    {
      id: "binance",
      profileImg:
        "https://pbs.twimg.com/profile_images/1609809081950158848/5VV7u7va_400x400.jpg",
      followedDate: "Jan. 14th, 2023",
      username: "@binance",
      followers: "10.4M",
      following: "512",
      followingRatio: "20,312.5",
      qualityScore: "Very High",
      circles: ["Crypto", "Exchange", "VIP"],
    },
    {
      id: "saylor",
      profileImg:
        "https://pbs.twimg.com/profile_images/1485632175932383235/8t0DGo6V_400x400.jpg",
      followedDate: "Dec. 27th, 2022",
      username: "@saylor",
      followers: "3M",
      following: "586",
      followingRatio: "5,119.45",
      qualityScore: "Very High",
      circles: ["Crypto", "Investor", "VIP"],
    },
    {
      id: "APompliano",
      profileImg:
        "https://pbs.twimg.com/profile_images/1547787118243561478/PxWzJo1H_400x400.jpg",
      followedDate: "Oct. 24th, 2022",
      username: "@APompliano",
      followers: "1.6M",
      following: "7,174",
      followingRatio: "223.03",
      qualityScore: "Very High",
      circles: ["Crypto", "Finance", "Leadership"],
    },
    {
      id: "ReplubicCrypto",
      profileImg:
        "https://pbs.twimg.com/profile_images/1534217287686926336/It5pJQV5_400x400.png",
      followedDate: "Feb. 17th, 2023",
      username: "@RepublicCrypto",
      followers: "31.4k",
      following: "479",
      followingRatio: "65.55",
      qualityScore: "Very High",
      circles: ["Crypto", "VC", "Finance"],
    },
  ];

  const [topNewFollowers, setTopNewFollowers] =
    useState<FollowerData[]>(mockedFollowers);

  const showMoreTweets = () => {
    setTopNewFollowers([...topNewFollowers, ...mockedFollowers]);
  };

  return (
    <div className="rounded-xl border bg-white py-9 font-gotham shadow-[0px_0px_14px_rgba(1,27,56,0.1)] dark:bg-inherit">
      <p className="mb-2 px-8 text-2xl font-medium">Top New Followers</p>
      <div className="mb-8 grid w-full grid-cols-1 justify-center font-light 2xl:grid-cols-2 2xl:justify-start">
        {topNewFollowers &&
          topNewFollowers.map((follower) => (
            <CardTopNewFollower
              key={follower.id}
              data={follower}
              loading={loading}
            />
          ))}
      </div>
      <div className="flex justify-center">
        {" "}
        <Button
          color="blue"
          variant="light"
          size="xl"
          className="text-lg font-medium"
          onClick={showMoreTweets}
        >
          Show More Followers
        </Button>
      </div>
    </div>
  );
};
