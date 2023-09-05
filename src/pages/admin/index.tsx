import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import TopNavigation from "@/components/TopNavigation";
import MainMetricCard from "@/components/MainMetricCard";
import SideNavigation from "@/components/SideNavigation";
import SummaryWrapper from "@/components/SummaryWrapper";
import Dropdown from "@/components/Dropdown";
import Table from "@/components/Table";
import { useQuery } from "react-query";
import Link from "next/link";
import { getAllClients, getOrganizations } from "@/lib/api/client";
import { MiniLoader } from "@/components/MiniLoader";

const menu: any = [
  {
    title: "Dashboard",
    active: false,
  },
  {
    title: "My Wallet",
    active: false,
  },
  {
    title: "Transaction",
    active: false,
  },
  {
    title: "Analytics",
    active: false,
  },
  {
    title: "Reports",
    active: false,
  },
  {
    title: "Message",
    active: false,
  },
  {
    title: "Login",
    url: "/auth/login?test=test",
    active: false,
  },
];

export default function AdminPage() {
  const { data: clientsData, isLoading: isClientsLoading } = useQuery(
    "adminClients",
    getAllClients
  );
  const { data: organizations, isLoading: isOrganizationsLoading } = useQuery(
    "organizations",
    getOrganizations
  );

  const isLoading = [isClientsLoading, isOrganizationsLoading].some(
    (item) => item
  );

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          <h1 className="text-xl">Organizations</h1>
          <div className="flex items-center gap-6">
            {isLoading && <MiniLoader />}
            <Link
              className="rounded bg-green-600 p-2"
              href="/admin/organizations/new"
            >
              New Organization
            </Link>
          </div>
        </div>
        <div className="mt-8">
          {organizations?.organizations?.map((organization) => (
            <div
              key={organization.organization_id}
              className="flex items-center justify-between border-b border-white py-6 first:mt-0 last:border-b-0"
            >
              <h2>
                {organization.organization_name}{" "}
                <span className="text-gray-500">
                  ({organization.organization_slug})
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <Link
                  className="rounded bg-red-600 p-2"
                  href={`/admin/organizations/[id]`}
                  as={`/admin/organizations/${organization.organization_id}`}
                >
                  Delete
                </Link>
                <Link
                  className="rounded bg-green-600 p-2 px-4"
                  href={`/admin/organizations/[id]`}
                  as={`/admin/organizations/${organization.organization_id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
