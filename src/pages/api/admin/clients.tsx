import { getClients } from "@/lib/api/server";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(_req: NextApiRequest, res: NextApiResponse) {
  const clients = await getClients();
  return res.status(200).json(clients.filter((o) => !o.isSpoofAccount));
}

export default use(withAuth, hello);
