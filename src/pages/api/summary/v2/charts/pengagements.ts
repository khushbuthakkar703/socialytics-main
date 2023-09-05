import { getClientData } from "@/lib/redis";
import { NextApiRequestWithUser, withAuth } from "@/lib/withAuth";
import { NextApiResponse } from "next";
import { use } from "next-api-route-middleware";
import { getTweetsMetricsServer } from "@/lib/api/server";

export async function hello(req: NextApiRequestWithUser, res: NextApiResponse) {
  const { page = 1 } = req.query;

  const clients = await getClientData(req.user.organization_id);
  const url = `clients/${clients.mainClient.id}/tweets/promoted/engagments`;

  const tweets = await getTweetsMetricsServer(url, page as string);

  return res.json(tweets);
}

export default use(withAuth, hello);
