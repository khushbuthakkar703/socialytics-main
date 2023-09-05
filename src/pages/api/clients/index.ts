import { getClientsTweets } from "@/lib/api/server";
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
  const clients = await getClientData(req.user.organization_id);

  return res.json(clients);
}

export default use(withAuth, hello);
