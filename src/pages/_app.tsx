import type { AppProps } from "next/app";
import "@/styles/index.css";
import {
  createStytchB2BHeadlessClient,
  StytchB2BProvider,
  useStytchMember,
  useStytchMemberSession,
} from "@stytch/nextjs/dist/b2b";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { StytchB2BHeadlessClient } from "@stytch/vanilla-js/dist/b2b";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { getPathFromUrl } from "@/lib";
import { authNeeded } from "@/pages";
import { NextShield } from "next-shield";
import { ThemeProvider, useTheme } from "next-themes";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAuth } from "@/lib/stytch/useAuth";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

import localFont from "@next/font/local";

import { Poppins } from "@next/font/google";

const stytch: StytchB2BHeadlessClient = createStytchB2BHeadlessClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * (60 * 1000),
    },
  },
});

const darkBaseColor = "#696868";
const darkHighlightColor = "#999";

const lightBaseColor = "#c0c0c0";
const lightHighlightColor = "#A0A0A0";

const gotham = localFont({
  src: [
    {
      path: "../../public/font/gotham-cufonfonts/GothamLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/gotham-cufonfonts/GothamMedium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gotham",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export function MyApp({ Component, pageProps }: AppProps) {
  const session = useAuth();
  const router = useRouter();

  console.log(session);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const skeletonColor =
    currentTheme === "dark" ? darkBaseColor : lightBaseColor;
  const skeletonHighlight =
    currentTheme === "dark" ? darkHighlightColor : lightHighlightColor;

  return (
    <NextShield
      isAuth={!!session?.session?.session}
      isLoading={!session?.session?.isInitialized}
      router={router}
      privateRoutes={[
        "/",
        "/dashboard",
        "/admin",
        "/admin/organizations/[id]",
        "/admin/organizations/[id]/members",
        "/tweets",
        "/dashboard-v2",
        "/campaigns/[id]/analytics",
      ]}
      publicRoutes={["/auth/login", "/auth/discover"]}
      loginRoute="/auth/login"
      LoadingComponent={
        <Loader subtitle="Please wait while we load your state." />
      }
      RBAC={{
        SUPERADMIN: {
          grantedRoutes: [
            "/",
            "/tweets",
            "/admin",
            "/admin/organizations/[id]",
            "/admin/organizations/[id]/members",
            "/dashboard-v2",
            "/campaigns/[id]/analytics",
          ],
          accessRoute: "/admin",
        },
        ADMIN: {
          grantedRoutes: [
            "/",
            "/tweets",
            "/dashboard-v2",
            "/campaigns/[id]/analytics",
          ],
          accessRoute: "/",
        },

        USER: {
          grantedRoutes: [
            "/",
            "/tweets",
            "/dashboard-v2",
            "/campaigns/[id]/analytics",
          ],
          accessRoute: "/",
        },
      }}
      userRole={session.role}
    >
      <SkeletonTheme
        baseColor={skeletonColor}
        highlightColor={skeletonHighlight}
      >
        <Component {...pageProps} />
        <ToastContainer position="top-left" />
        <ReactQueryDevtools initialIsOpen={false} />
      </SkeletonTheme>
    </NextShield>
  );
}

export default function WrappedApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${gotham.variable} ${poppins.variable}`}>
      <div className="hidden sm:block">
        <QueryClientProvider client={queryClient}>
          <StytchB2BProvider stytch={stytch}>
            <ThemeProvider attribute="class">
              <MyApp Component={Component} {...pageProps} />
            </ThemeProvider>
          </StytchB2BProvider>
        </QueryClientProvider>
      </div>
      <div className="flex h-screen items-center justify-center p-4 sm:hidden">
        <p className="text-center">
          For a better experience please use on Desktop instead of mobile.
        </p>
      </div>
    </main>
  );
}
