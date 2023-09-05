import ky from "ky";
import { SearchOrganizationMemberResponse } from "stytch/types/lib/b2b/members";
import {
  CreateOrganizationResponse,
  SearchOrganizationResponse,
} from "stytch/types/lib/b2b/organizations";
import {
  BoostedTweetInterface,
  GetClientsResponse,
  GetClientsTweetHistoryResponse,
  UpdateOrganizationPayload,
  GetAllCampaignsResponse,
  GetDbCampaignsResponse,
} from "./types";

const client = ky.create({ prefixUrl: "/api/", credentials: "same-origin" });

export const getAllClients = () =>
  client.get("admin/clients").json<GetClientsResponse>();

export const getOrgsClients = (id: string) =>
  client.get(`admin/organizations/${id}/clients`).json<{
    clients: { id: string; name: string }[];
    mainClient: { id: string; name: string };
  }>();

export const clientGetClients = () =>
  client.get("clients").json<{
    clients: { id: string; name: string }[];
    mainClient: { id: string; name: string };
  }>();

export const userGetCampaigns = async () => {
  const res = await client.get("campaigns");
  return await res.json<
    {
      id: string;
      searchQuery: string;
      startDate: string | Date;
      endDate: string | Date | undefined;
    }[]
  >();
};

export const getAllCampaigns = async () => {
  const res = await client.get("admin/campaigns");
  return await res.json<GetAllCampaignsResponse>();
};

export const getActiveCampaigns = async (id: string) => {
  const res = await client.get(`admin/organizations/${id}/campaigns`);
  return await res.json<
    {
      id: string;
      searchQuery: string;
      startDate: string | Date;
      endDate: string | Date | undefined;
    }[]
  >();
};

export const getCampaignStatuses = async () => {
  const res = await client.get(`campaigns/statuses`);
  return await res.json<
    {
      id: string;
      status: "ACTIVE" | "PAUSED" | "ENDED" | "PENDING";
    }[]
  >();
};

export const getOrganizations = () =>
  client.get("admin/organizations").json<SearchOrganizationResponse>();

export const getMembers = (id: string) =>
  client
    .get(`admin/organizations/${id}/members`)
    .json<SearchOrganizationMemberResponse>();

export const updateOrganization = (
  id: string,
  data: UpdateOrganizationPayload
) => {
  return id == "new"
    ? client
        .post(`admin/organizations/`, { json: data })
        .json<CreateOrganizationResponse>()
    : client
        .patch(`admin/organizations/${id}`, { json: data })
        .json<CreateOrganizationResponse>();
};

export const deleteOrganization = (id: string) => {
  return client.delete(`admin/organizations/${id}`).json<any>();
};

export const deleteOrganizationMember = (id: string, memberId: string) => {
  return client
    .delete(`admin/organizations/${id}/members/${memberId}`)
    .json<any>();
};

export const createOrganizationMember = (
  id: string,
  data: { name: string; email: string }
) =>
  client
    .post(`admin/organizations/${id}/members`, { json: data })
    .json<SearchOrganizationMemberResponse>();

export const getSummary = () =>
  client.get("summary").json<{
    followersData: Record<string, number>;
    tweetsData: Record<
      string,
      {
        count: number;
        engagements: number;
        impressions: number;
        quoteCount: number;
        retweetCount: number;
        replyCount: number;
        likeCount: number;
        promotedLikeCount: number;
        promotedRetweetCount: number;
        promotedEngagements: number;
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
  }>();

export const getSummaryv2 = async () => {
  const response = await client.get("summary/v2");
  return await response.json<{
    followersData: Record<string, number>;
    tweetsData: Record<
      string,
      {
        count: number;
        engagements: number;
        impressions: number;
        quoteCount: number;
        retweetCount: number;
        replyCount: number;
        likeCount: number;
        promotedLikeCount: number;
        promotedRetweetCount: number;
        promotedEngagements: number;
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
  }>();
};

export const getClientSummary = (id: string, start: string, end: string) =>
  client
    .get(`clients/${id}/summary`, { searchParams: { from: start, to: end } })
    .json<{
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
          engagements: number;
          impressions: number;
          promotedRetweetCount: number;
          promotedEngagements: number;
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
    }>();

export const getTweets = (
  id: string,
  query: {
    from: string;
    to: string;
    perPage?: string | number;
    page?: string | number;
  }
) =>
  client
    .get(`clients/${id}/tweets`, { searchParams: query })
    .json<GetClientsTweetHistoryResponse>();

export const addTweet = (data: BoostedTweetInterface) => {
  client.post(`tweets`, { json: data }).json<any>();
};

export const createCampaign = (data: string) => {
  client.post(`campaign`, { json: data }).json<any>();
};

export const getTweetsMetrics = (url: string, page: string | number): any =>
  client.get(url, { searchParams: { page } }).json<any>();
