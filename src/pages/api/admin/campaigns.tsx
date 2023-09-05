import { getActiveCampaigns } from "@/lib/api/client";
import { getAllCampaigns, getClientsTweets } from "@/lib/api/server";
import { getClientData, redis } from "@/lib/redis";
import {
  AuthError,
  NextApiRequestWithUser,
  RequestError,
  withAuth,
} from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequestWithUser, res: NextApiResponse) {
  const campaigns = await getAllCampaigns();
  return res.json(campaigns);
}

export default use(withAuth, hello);
