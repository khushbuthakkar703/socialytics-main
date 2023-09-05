import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import {
  createOrganizationMember,
  deleteOrganization,
  deleteOrganizationMember,
  getAllClients,
  getMembers,
  getOrganizations,
  updateOrganization,
} from "@/lib/api/client";
import { MiniLoader } from "@/components/MiniLoader";
import Loader from "@/components/Loader";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
};
export default function AdminPage() {
  const router = useRouter();

  const { data: organizations, isFetching: isOrganizationsLoading } = useQuery(
    "organizations",
    getOrganizations
  );

  const { data: members, isFetching: isMembersLoading } = useQuery(
    ["members", router.query.id],
    () => getMembers(router.query.id as string),
    { enabled: !!router.query.id && router.query.id !== "new" }
  );

  const organization = useMemo(() => {
    if (router.query.id == "new") return null;
    const org = organizations?.organizations?.find(
      (o) => o.organization_id == router.query.id
    );
    // if (!org && !isOrganizationsLoading) router.push("/admin");
    return org;
  }, [organizations, router.query?.id]);

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    formState: { errors: errorsMember },
  } = useForm<FormValues>({});

  const queryClient = useQueryClient();

  const deleteMemberMutation = useMutation(
    async (memberId: string) => {
      return deleteOrganizationMember(router.query.id as string, memberId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("members");
      },
    }
  );

  const createMemberMutation = useMutation(
    async (values: FormValues) => {
      return createOrganizationMember(router.query.id as string, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("members");
      },
    }
  );

  const isLoading = [isOrganizationsLoading, isMembersLoading].some(
    (item) => item
  );

  if (!organization && router.query.id != "new")
    return <Loader subtitle="Loading your organization." />;

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          <h1 className="text-xl">
            Organizations -{" "}
            {organization?.organization_name ?? "New Organization"}
          </h1>
          <div className="flex items-center gap-6">
            {isLoading && <MiniLoader />}
          </div>
        </div>
        <h2 className="text-xl">
          Members {isMembersLoading && <MiniLoader />}
        </h2>
        <div className="my-4">
          {members?.members?.map((member) => (
            <div
              key={member.member_id}
              className="flex items-center justify-between border-b border-white py-6 first:mt-0 first:pt-0 last:border-b-0"
            >
              <h2>
                {member.name}{" "}
                <span className="text-gray-500">({member.email_address})</span>
              </h2>
              <div className="flex items-center gap-4">
                <button
                  className="rounded bg-red-600 p-2"
                  onClick={() => deleteMemberMutation.mutate(member.member_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <form
            className="my-4 flex flex-col items-center  sm:flex-row "
            onSubmit={handleSubmitMember((values) =>
              createMemberMutation.mutate(values)
            )}
          >
            <div className="flex w-full flex-col justify-evenly gap-2 sm:flex-row">
              <div className="flex-auto sm:w-96">
                <input
                  className="w-full rounded p-2 focus:outline-none"
                  placeholder="Email"
                  {...registerMember("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                ></input>
                {errorsMember.email && (
                  <div className="text-xs text-red-500">
                    Please ensure you complete this field.
                  </div>
                )}
              </div>
              <div className="flex-auto sm:w-96">
                <input
                  className="w-full rounded p-2 focus:outline-none"
                  placeholder="Name"
                  {...registerMember("name", {
                    required: true,
                  })}
                ></input>
                {errorsMember.name && (
                  <div className="text-xs text-red-500">
                    Please ensure you complete this field.
                  </div>
                )}
              </div>
              <button
                className="flex-none rounded bg-green-600 p-2 px-4"
                type="submit"
              >
                Save New Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
