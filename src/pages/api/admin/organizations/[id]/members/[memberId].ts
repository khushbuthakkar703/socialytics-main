import { stytchClient } from "@/lib";
import { getClients } from "@/lib/api/server";
import { withAuth } from "@/lib/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-route-middleware";

export async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.id) return;
  if (req.method == "DELETE") {
    const members = await stytchClient.organizations.members.delete({
      member_id: req.query.memberId as string,
      organization_id: req.query.id as string,
    });

    return res.status(200).json(members);
  }
}

export default use(withAuth, hello);
