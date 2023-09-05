import { NextApiRequest } from "next";
import { Middleware } from "next-api-route-middleware";
import {
  MemberSession,
  ResponseWithMember,
} from "stytch/types/lib/b2b/shared_b2b";
import { stytchClient } from "./stytch";
import { mapStytchArray } from "./stytch/utils";

export type NextApiRequestWithUser = NextApiRequest & {
  user: Omit<MemberSession, "custom_claims"> & {
    custom_claims: {
      memberId: string;
      memberIsAdmin: boolean;
      memberName: string;
      organizationId: string;
    };
  };
};

export const withAuth: Middleware<NextApiRequestWithUser> = async (
  req,
  res,
  next
) => {
  if (req.cookies["stytch_session_jwt"]) {
    try {
      let session = await stytchClient.sessions.authenticateJwt(
        req.cookies["stytch_session_jwt"]
      );

      // console.log(session.member_session.custom_claims);

      if (session?.member_session) {
        // if (!session?.member_session?.custom_claims?.["claimsInitialized"]) {
        //   const member = await stytchClient.organizations.members.get({
        //     organization_id: session.member_session.organization_id,
        //     member_id: session.member_session.member_id,
        //   });

        //   const newSession = await stytchClient.sessions.authenticate({
        //     session_jwt: req.cookies["stytch_session_jwt"],
        //     session_custom_claims: {
        //       claimsInitialized: true,
        //       superAdmin:
        //         member.organization.organization_id ==
        //           process.env.SUPERADMIN_ORG || false,
        //       role: getRole(member),
        //       metadata: JSON.stringify({
        //         ...member.member.trusted_metadata,
        //         ...member.organization.trusted_metadata,
        //       }),
        //     },
        //   });

        //   session = await stytchClient.sessions.authenticateJwt(
        //     newSession.session_jwt
        //   );
        // }

        console.log(session?.member_session);
        req.user = {
          ...session.member_session,
          custom_claims: {
            ...(session.member_session.custom_claims as any),
            // clients: mapStytchArray(
            //   session?.member_session?.custom_claims?.clients
            // ) as any,
          },
        };

        await next();
        return;
      }
    } catch (e: any) {
      if (e.name == "AuthError")
        return res.status(401).send({ message: e.message });
      if (e.name == "RequestError")
        return res.status(400).send({ message: e.message });
      console.log(e);
      return res.status(500).send({ message: "Internal Error" });
      /* empty */
    }
  }

  res.status(401).send({ message: "Invalid auth cookie." });
};

export const getRole = (member: ResponseWithMember): ROLE => {
  if (member.organization.organization_id == process.env.SUPERADMIN_ORG)
    return "SUPERADMIN";
  else if (member.member.trusted_metadata.admin) return "ADMIN";
  else return "USER";
};

export type ROLE = "SUPERADMIN" | "ADMIN" | "USER";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class RequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestError";
  }
}
