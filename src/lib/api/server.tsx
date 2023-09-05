import ky from "ky";
import {
  BoostedTweetInterface,
  GetAllCampaignsResponse,
  GetClientsResponse,
  GetClientsTweetHistoryResponse,
  GetDbCampaignsResponse,
  TweetsInterface,
} from "./types";

const client = ky.create({
  prefixUrl: process.env.BACKEND_API_URL,
  headers: { Authorization: `Bearer ${process.env.MACHINE_TOKEN}` },
});

const slack = ky.create({
  prefixUrl: "https://hooks.slack.com/services",
});

export const getClients = async () => {
  const res = await client.get("clients");
  const allClients = await res.json<GetClientsResponse>();
  return allClients;
};

export const getClientsTweets = async (
  id: string,
  query: {
    from: string;
    to: string;
    perPage?: string | number;
    page?: string | number;
  }
) => {
  return client
    .get(`clients/${id}/tweets`, { searchParams: query })
    .json<GetClientsTweetHistoryResponse>();
};

export const getClientsSummary = async (
  id: string,
  query: Partial<{ from: string; to: string; includeFollowers: boolean }>
) => {
  return client
    .get(`clients/${id}/summary`, { searchParams: query })
    .json<GetClientsResponse>();
};

export const getClientsSummaryV2 = async (
  id: string,
  query: Partial<{ from: string; to: string; includeFollowers: boolean }>
) => {
  const response = await client.get(`clients/${id}/summary/v2`, {
    searchParams: query,
  });
  return await response.json<GetClientsResponse>();
};

export const addTweetServer = async (data: BoostedTweetInterface) => {
  try {
    const reqData = await client.post(`tweets/new`, { json: data });
    const res = await reqData.json();
    return res;
  } catch (e) {
    return "";
  }
};

export const createCampaignServer = async (data?: any) => {
  try {
    const reqData = await slack.post(`${process.env.SLACK_HOOK}`, {
      json: {
        ...data,
      },
    });
    const res = await reqData.json();
    return res;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export const getTweetsMetricsServer = async (url: string, page: string) => {
  return await client
    .get(url, { searchParams: { page, perPage: 5 } })
    .json<TweetsInterface>();
};
export const getAllCampaigns = async () => {
  const response = await client.get("campaigns");
  return await response.json<GetAllCampaignsResponse>();
};

export const getCampaignStatuses = async (ids: string[]) => {
  const res = await client.get("db/campaigns", {
    searchParams: {
      crudQuery: JSON.stringify({ where: { id: { in: ids } } }),
    },
  });
  return await res.json<GetDbCampaignsResponse>();
};
