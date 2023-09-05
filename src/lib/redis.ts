import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://us1-together-narwhal-38419.upstash.io",
  token: process.env.REDIS_TOKEN,
});

export const setClientData = (
  id: string,
  data: {
    clients: { id: string; name: string }[];
    mainClient: { id: string; name: string };
    campaigns: {
      id: string;
      searchQuery: string;
      startDate: string | Date;
      endDate: string | Date | undefined;
    }[];
  }
) => redis.json.set(`organization-${id}`, "$", data);

export const getClientData = (
  id: string
): Promise<{
  clients: { id: string; name: string }[];
  mainClient: { id: string; name: string };
  campaigns: {
    id: string;
    searchQuery: string;
    startDate: string | Date;
    endDate: string | Date | undefined;
    status: "ACTIVE" | "PAUSED" | "ENDED" | "PENDING";
  }[];
}> => redis.json.get(`organization-${id}`, "$").then((o) => o?.[0] ?? null);
