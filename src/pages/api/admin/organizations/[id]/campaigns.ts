import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { getClientData } from "@/lib/redis";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) return;

  const organization = await getClientData(req.query.id as string);

  return res.status(200).json(organization?.campaigns ?? []);
}

export default use(withAuth, hello);
