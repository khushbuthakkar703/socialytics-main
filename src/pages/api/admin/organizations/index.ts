import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { UpdateOrganizationPayload } from "@/lib/api/types";
import { redis, setClientData } from "@/lib/redis";
import { RequestError, withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const organizations = await stytchClient.organizations.search({});
    return res.status(200).json(organizations);
  } else if (req.method == "POST") {
    const data = req.body as UpdateOrganizationPayload;
    if (data.clients.length == 0 || !data.mainClient?.id)
      throw new RequestError("Invalid clients length");

    const response = await stytchClient.organizations.create({
      organization_name: data.name,
      organization_slug: data.slug,
      trusted_metadata: {},
    });

    setClientData(req.query.id as string, {
      clients: data.clients.map((o) => ({ id: o.id, name: o.username })),
      mainClient: { id: data.mainClient.id, name: data.mainClient.username },
      campaigns:
        data.campaigns?.map((campaign) => ({
          id: campaign.id,
          searchQuery: campaign.searchQuery,
          startDate: campaign.startDate,
          endDate: campaign?.endDate,
        })) ?? [],
    });

    return res.status(200).json(response);
  }
}

export default use(withAuth, hello);
