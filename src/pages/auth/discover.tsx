import Button from "@/components/Button";
import {
  useStytchB2BClient,
  useStytchMember,
  useStytchMemberSession,
} from "@stytch/nextjs/dist/b2b";
import {
  B2BMagicLinksDiscoveryAuthenticateResponse,
  DiscoveredOrganization,
  StytchB2BHeadlessClient,
} from "@stytch/vanilla-js/dist/b2b";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function discover() {
  const router = useRouter();

  const stytch = useStytchB2BClient() as StytchB2BHeadlessClient;
  const member = useStytchMember();
  const session = useStytchMemberSession();

  console.log(session);
  const [discoveryData, setDiscoveryData] =
    useState<B2BMagicLinksDiscoveryAuthenticateResponse>();

  const initDiscovery = async (token: string) => {
    console.log(token);
    const data = await stytch.magicLinks.discovery
      .authenticate({ discovery_magic_links_token: token })
      .catch(() => {
        router.push("/auth/login");
      });

    if (!data) return;
    console.log(data);
    setDiscoveryData(data);
  };

  const exchangeSession = async (org: DiscoveredOrganization) => {
    stytch.discovery.intermediateSessions.exchange({
      intermediate_session_token: discoveryData!.intermediate_session_token,
      organization_id: org.organization.organization_id,
      session_duration_minutes: 10080,
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    const data = router.query as { stytch_token_type: string; token: string };
    console.log(data);
    if (data.stytch_token_type != "discovery" || !data.token)
      router.push("/auth/login");

    initDiscovery(data.token);
  }, [router.isReady]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      <div className="flex w-full max-w-md flex-col rounded-md bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10">
        <div className="self-center text-xl font-medium uppercase text-gray-800 sm:text-2xl">
          Select an Organization
        </div>

        <div className="mt-10">
          {discoveryData?.discovered_organizations?.map((org) => (
            <div
              key={org.organization.organization_id}
              className="flex cursor-pointer select-none flex-col rounded border border-black p-2 text-black"
              onClick={() => exchangeSession(org)}
            >
              {org.organization.organization_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
