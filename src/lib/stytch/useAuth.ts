import { useStytchMemberSession } from "@stytch/nextjs/dist/b2b";
import { mapStytchArray } from "./utils";

export const useAuth: () => AuthData = () => {
  const session = useStytchMemberSession();

  const claims = session?.session?.custom_claims;

  if (!claims) return { session };
  return {
    session,
    ...claims,
    role:
      claims.organizationId == process.env.NEXT_PUBLIC_SUPERADMIN_ORG
        ? "SUPERADMIN"
        : claims.memberIsAdmin
        ? "ADMIN"
        : "USER",
  };
};

type AuthData = {
  session: {
    session: {
      authentication_factors: Array<{
        delivery_method: string;
        email_factor: {
          email_address: string;
          email_id: string;
        };
        last_authenticated_at: string;
        type: string;
      }>;
      custom_claims: {
        memberId: string;
        memberIsAdmin: boolean;
        memberName: string;
        organizationId: string;
      };
      expires_at: string;
      last_accessed_at: string;
      member_id: string;
      member_session_id: string;
      organization_id: string;
      started_at: string;
    };
    fromCache: boolean;
    isInitialized: boolean;
  };
  memberId: string;
  memberIsAdmin: boolean;
  memberName: string;
  organizationId: string;
  role: string;
};
