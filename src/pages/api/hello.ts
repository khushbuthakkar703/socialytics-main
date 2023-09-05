import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(_req: NextApiRequest, res: NextApiResponse) {
  // console.log(_req)
  res.status(200).json({ name: "Hello Next.js 👋" });
}

export default use(withAuth, hello);
