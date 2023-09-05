import { addTweetServer, getClientsTweets } from "@/lib/api/server";
import { getClientData, redis } from "@/lib/redis";
import {
  AuthError,
  NextApiRequestWithUser,
  RequestError,
  withAuth,
} from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  if (req.method == "POST") {
    try {
      const response = await addTweetServer(req.body);
      res.status(200).json({ data: response });
    } catch (error: any) {
      console.log("Error ... " + error.message);
      res.status(500).json({ status: "ERROR", message: error.message });
    }
  }
}

export default use(withAuth, hello);
