import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) return;
  if (req.method == "POST") {
    const data = req.body as { name: string; email: string };
    const newMember = await stytchClient.organizations.members
      .create({
        organization_id: req.query.id as string,
        email_address: data.email,
        name: data.name,
      })
      .catch(console.log);
    return res.status(200).json(newMember);
  }
  const members = await stytchClient.organizations.members.search({
    organization_ids: [req.query.id as string],
  });
  return res.status(200).json(members);
}

export default use(withAuth, hello);
