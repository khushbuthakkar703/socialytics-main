import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { UpdateOrganizationPayload } from "@/lib/api/types";
import { redis, setClientData } from "@/lib/redis";
import { RequestError } from "@/lib/withAuth";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) return;
  if (req.method == "PATCH") {
    const data = req.body as UpdateOrganizationPayload;

    if (data.clients.length == 0 || !data.mainClient?.id)
      throw new RequestError("Invalid clients length");
    const response = await stytchClient.organizations.update({
      organization_id: req.query.id as string,
      organization_name: data.name,
      organization_slug: data.slug,
      trusted_metadata: {
        clients: data.clients.map((o) => ({ id: o.id, name: o.username })),
        mainClient: { id: data.mainClient.id, name: data.mainClient.username },
        campaigns:
          data.campaigns?.map((campaign) => ({
            id: campaign.id,
            searchQuery: campaign.searchQuery,
            startDate: campaign.startDate,
            endDate: campaign?.endDate,
          })) ?? [],
      },
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
  } else if (req.method == "DELETE") {
    const response = await stytchClient.organizations.delete({
      organization_id: req.query.id as string,
    });
    return res.status(200).json(response);
  }

  const organization = await stytchClient.organizations.get({
    organization_id: req.query.id as string,
  });

  return res.status(200).json(organization);
}

export default use(withAuth, hello);
