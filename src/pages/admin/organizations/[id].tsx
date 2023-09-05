import { useMemo } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import {
  deleteOrganization,
  deleteOrganizationMember,
  getActiveCampaigns,
  getAllCampaigns,
  getAllClients,
  getMembers,
  getOrganizations,
  getOrgsClients,
  updateOrganization,
} from "@/lib/api/client";
import { MiniLoader } from "@/components/MiniLoader";
import Loader from "@/components/Loader";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Campaign } from "@/lib/api/types";

const Input = ({
  label,
  register,
  required,
  error,
}: {
  label: keyof FormValues;
  register: any;
  required: boolean;
  error: any;
}) => (
  <div className="flex flex-col items-center gap-2 sm:flex-row ">
    <span className="w-16">{labels[label]}</span>
    <div>
      <input
        className="rounded p-2 focus:outline-none"
        {...register(label, { required: true })}
      ></input>
      {error && (
        <div className="text-xs text-red-500">
          Please ensure you complete this field.
        </div>
      )}
    </div>
  </div>
);

const labels: Record<keyof FormValues, string> = {
  name: "Name",
  slug: "Slug",
  clients: "Clients",
  mainClient: "Main Client",
  campaigns: "Campaigns",
};

type FormValues = {
  name: string;
  slug: string;
  clients: {
    value: string;
    label: string;
  }[];
  mainClient?: {
    value: string;
    label: string;
  };
  campaigns?: {
    value: string;
    label: string;
  }[];
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

  const { data: allClientsData, isLoading: isClientsLoading } = useQuery(
    "adminClients",
    getAllClients
  );

  const { data: clientsData, isLoading: isAllClientsLoading } = useQuery(
    ["clients", router.query.id],
    () =>
      router.query.id == "new"
        ? null
        : getOrgsClients(router.query.id as string)
  );

  const { data: allCampaigns, isLoading: isAllCampaignsLoading } = useQuery(
    "allCampaigns",
    getAllCampaigns
  );

  const { data: activeCampaigns, isLoading: isActiveCampaignsLoading } =
    useQuery(["activeCampaigns", router.query.id], () =>
      getActiveCampaigns(router.query.id as string)
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
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
    control,
  } = useForm<FormValues>({
    values: organization
      ? {
          name: organization?.organization_name,
          slug: organization?.organization_slug,
          clients:
            clientsData?.clients?.map((o: any) => ({
              value: o.id,
              label: o.name,
            })) ?? [],
          mainClient: clientsData?.mainClient
            ? {
                value: clientsData?.mainClient.id,
                label: clientsData?.mainClient.name,
              }
            : undefined,
          campaigns:
            activeCampaigns?.map((o) => ({
              value: o.id,
              label: o.searchQuery,
            })) ?? [],
        }
      : undefined,
    mode: "all",
  });

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    formState: { errors: errorsMember },
  } = useForm<{ name: string; email: string }>({});

  const queryClient = useQueryClient();

  const saveMutation = useMutation(
    async (values: FormValues) => {
      if (!allClientsData) return;
      return updateOrganization(router.query.id as string, {
        ...values,
        clients: values.clients.map(
          (o) => allClientsData.find((c) => c.id == o.value)!
        ),
        mainClient: allClientsData.find(
          (c) => c.id == values.mainClient?.value
        )!,
        campaigns:
          (values.campaigns?.map((campaignSelected) =>
            allCampaigns?.find(
              (campaign) => campaign.id === campaignSelected.value
            )
          ) as Campaign[]) || undefined,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("organizations");
        queryClient.invalidateQueries("members");
        router.push(
          `/admin/organizations/${data?.organization.organization_id}`
        );
      },
    }
  );

  const deleteMutation = useMutation(
    async () => {
      return deleteOrganization(router.query.id as string);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("organizations");
        queryClient.invalidateQueries("members");
        router.push("/admin");
      },
    }
  );

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

  const watchedClients = watch("clients");

  const isLoading = [
    isOrganizationsLoading,
    isAllCampaignsLoading,
    isActiveCampaignsLoading,
    saveMutation.isLoading,
    deleteMutation.isLoading,
    deleteMemberMutation.isLoading,
  ].some((item) => item);

  if (
    ((!organization || isClientsLoading) && router.query.id != "new") ||
    isAllClientsLoading
  )
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
        <form
          onSubmit={handleSubmit((val) => saveMutation.mutate(val))}
          className="mt-8"
        >
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
            <Input
              label="name"
              register={register}
              required={true}
              error={errors.name}
            />

            <Input
              label="slug"
              register={register}
              required={true}
              error={errors.slug}
            />
          </div>

          {router.query?.id == "new" ? null : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl">
                  Members {isMembersLoading && <MiniLoader />}
                </h2>
                <Link
                  className="rounded bg-green-600 p-2 px-4"
                  href="/admin/organizations/[id]/members"
                  as={`/admin/organizations/${router.query.id}/members`}
                >
                  New Member
                </Link>
              </div>
              <div className="my-4">
                {members?.members?.map((member) => (
                  <div
                    key={member.member_id}
                    className="flex items-center justify-between border-b border-white py-6 first:mt-0 first:pt-0 last:border-b-0"
                  >
                    <h2>
                      {member.name}{" "}
                      <span className="text-gray-500">
                        ({member.email_address})
                      </span>
                    </h2>
                    <div className="flex items-center gap-4">
                      <button
                        className="rounded bg-red-600 p-2"
                        onClick={() =>
                          deleteMemberMutation.mutate(member.member_id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="grid grid-cols-2 items-center justify-between gap-4 ">
            <div className="flex w-full items-center gap-x-2">
              <span className="w-16">Handles: </span>
              <div className="w-full dark:text-black">
                <Controller
                  control={control}
                  defaultValue={[]}
                  name="clients"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <ReactSelect
                      className="w-full"
                      ref={ref}
                      value={value}
                      onChange={(val) => onChange(val.map((c) => c))}
                      options={allClientsData?.map((c) => ({
                        value: c.id,
                        label: c.username,
                      }))}
                      isMulti
                      isSearchable
                    />
                  )}
                />
                {errors.clients && (
                  <div className="text-xs text-red-500">
                    Please ensure you complete this field.
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-x-2">
              <span className="w-16">Main: </span>
              <div className="w-full dark:text-black">
                <Controller
                  control={control}
                  name="mainClient"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ReactSelect
                      className="w-full"
                      onBlur={onBlur}
                      ref={ref}
                      value={value}
                      onChange={(val) => onChange(val)}
                      options={watchedClients}
                      isSearchable
                    />
                  )}
                />
                {errors.mainClient && (
                  <div className="text-xs text-red-500">
                    Please ensure you complete this field.
                  </div>
                )}{" "}
              </div>
            </div>
            <div className="flex w-full items-center gap-x-2">
              <span className="w-22">Campaigns: </span>
              <div className="w-full dark:text-black">
                <Controller
                  control={control}
                  defaultValue={[]}
                  name="campaigns"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <ReactSelect
                      className="w-full"
                      ref={ref}
                      value={value}
                      onChange={(val) => onChange(val.map((c) => c))}
                      options={
                        allCampaigns
                          ? allCampaigns.map((c) => ({
                              value: c.id,
                              label: c.searchQuery,
                            }))
                          : []
                      }
                      isMulti
                      isSearchable
                    />
                  )}
                />
                {errors.clients && (
                  <div className="text-xs text-red-500">
                    Please ensure you complete this field.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-24 flex items-center justify-end gap-2">
            <button
              className="rounded bg-red-600 p-2 px-4"
              onClick={() => deleteMutation.mutate()}
            >
              Delete Organization
            </button>
            <button className="rounded bg-green-600 p-2 px-4" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
