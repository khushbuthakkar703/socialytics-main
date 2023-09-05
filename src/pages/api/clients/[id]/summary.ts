import { getClientsSummary, getClientsTweets } from "@/lib/api/server";
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
  if (!clients?.clients?.find((o) => o.id == req.query.id))
    throw new AuthError("You do not have access to this client");
  if (!req.query.from || !req.query.to)
    throw new RequestError("You must provide a from and to date");
  const tweets = await getClientsSummary(req.query.id as string, {
    from: req.query.from as string,
    to: req.query.to as string,
    includeFollowers: true,
  });

  return res.json(tweets);
}

export default use(withAuth, hello);
