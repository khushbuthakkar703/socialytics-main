import { useQuery } from "react-query";
import { DashboardBody } from "./DashboardBody";
import { getSummaryv2 } from "@/lib/api/client";
import { useEffect } from "react";

interface DashboardProps {
  enableReport: () => void;
}

export const Dashboard = ({ enableReport }: DashboardProps) => {
  const { data: clientSummary, isLoading: isClientSummaryLoading } = useQuery(
    "clientSummary",
    getSummaryv2
  );

  useEffect(() => {
    !isClientSummaryLoading && enableReport();
  }, [isClientSummaryLoading]);

  return (
    <div className="py-7">
      <DashboardBody
        className=""
        data={clientSummary}
        isLoading={isClientSummaryLoading}
      />
    </div>
  );
};
