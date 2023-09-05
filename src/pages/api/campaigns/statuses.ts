import { getCampaignStatuses } from "@/lib/api/server";
import { getClientsTweets } from "@/lib/api/server";
import { Campaign } from "@/lib/api/types";
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
  const { campaigns } = await getClientData(req.user.organization_id);

  if (!campaigns || campaigns.length == 0) return res.json([]);

  const userCampaigns = await getCampaignStatuses(
    campaigns.map(({ id }) => id)
  );

  return res.json(
    userCampaigns?.data
      ? userCampaigns.data.map((campaign) => ({
          id: campaign.id,
          status: campaign.status,
        }))
      : []
  );
}

export default use(withAuth, hello);
