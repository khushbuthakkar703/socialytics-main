import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { getClientData } from "@/lib/redis";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query.id);
  if (!req.query.id) return;

  const clients = await getClientData(req.query.id as string);

  return res.status(200).json(clients);
}

export default use(withAuth, hello);
