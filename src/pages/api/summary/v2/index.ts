import { getClientsSummaryV2, getClientsTweets } from "@/lib/api/server";
import { getClientData } from "@/lib/redis";
import {
  AuthError,
  NextApiRequestWithUser,
  RequestError,
  withAuth,
} from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequestWithUser, res: NextApiResponse) {
  const clients = await getClientData(req.user.organization_id);

  const tweets = await getClientsSummaryV2(clients.mainClient.id as string, {
    includeFollowers: true,
  });

  return res.json(tweets);
}

export default use(withAuth, hello);
