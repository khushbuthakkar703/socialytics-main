import { useQuery } from "react-query";
import SummaryWrapper from "./SummaryWrapper";
import { clientGetClients, getClientSummary } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/stytch/useAuth";

interface SummaryHandlerDataProps {
  id: string;
  defaultCompareToId: string;
}

// interface ComparissonStored {
//   id: string;
//   compareId: string;
//   compareStartDate: Date;
//   compareEndDate: Date;
// }

export const SummaryHandlerData = ({
  id,
  defaultCompareToId,
}: SummaryHandlerDataProps) => {
  const { data: clientsData, isLoading: clientsIsLoading } = useQuery(
    "clients",
    clientGetClients
  );
  const auth = useAuth();
  const [compareId, setCompareId] = useState(
    clientsData?.mainClient.id == id ? defaultCompareToId : ""
  );
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 6))
  );
  const [endDate, setEndDate] = useState(new Date());

  const defaultComparissonDates = [
    new Date(new Date().setDate(new Date().getDate() - 6)),
    new Date(),
  ];

  const [compareStartDate, setCompareStartDate] = useState<Date | null>(
    clientsData?.mainClient.id == id ? defaultComparissonDates[0] : null
  );
  const [compareEndDate, setCompareEndDate] = useState<Date | null>(
    clientsData?.mainClient.id == id ? defaultComparissonDates[1] : null
  );
  const { data: clientData, isLoading } = useQuery(
    [`clientSummary-${id}`, startDate, endDate],
    () => getClientSummary(id, startDate.toISOString(), endDate.toISOString()),
    {
      enabled: startDate !== null && endDate !== null,
    }
  );
  const { data: comparedClientData } = useQuery(
    [`clientSummary-${compareId}`, compareStartDate, compareEndDate],
    () =>
      compareStartDate && compareEndDate
        ? getClientSummary(
            compareId,
            compareStartDate.toISOString(),
            compareEndDate.toISOString()
          )
        : undefined,
    {
      enabled:
        compareId !== "" &&
        compareStartDate !== null &&
        compareEndDate !== null,
      // This is not neccessary because of useQuery lib
      // enabled: !clientsData[id],
      // onSuccess: (data) =>
      //     handleClientsData(id, data)
    }
  );

  // useEffect(() => {
  //   const prevComparissons = localStorage.getItem("COMPARISSONS_DONE");
  //   if (prevComparissons !== null && prevComparissons !== "") {
  //     const parsedComparissons = JSON.parse(prevComparissons);
  //     Object.values(parsedComparissons).map((item: any) => {
  //       if (item.id == id) {
  //         setCompareId(item.compareId);
  //         setCompareStartDate(new Date(item.compareStartDate));
  //         setCompareEndDate(new Date(item.compareEndDate));
  //       }
  //     });
  //     console.log(compareId);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (comparedClientData) {
  //     const storedComparissons = localStorage.getItem("COMPARISSONS_DONE");
  //     let parsedStorage;
  //     if (storedComparissons !== null && storedComparissons !== "")
  //       parsedStorage = JSON.parse(storedComparissons);
  //     let modifiedFlag = false;
  //     if (parsedStorage) {
  //       Object.values(parsedStorage).map((item: any) => {
  //         if (item?.id == id) {
  //           modifiedFlag = true;
  //           return {
  //             id,
  //             compareId,
  //             compareStartDate: compareStartDate,
  //             compareEndDate: compareEndDate,
  //           };
  //         }
  //         return item;
  //       });
  //       if (!modifiedFlag) {
  //         parsedStorage = [
  //           ...parsedStorage,
  //           {
  //             id,
  //             compareId,
  //             compareStartDate: compareStartDate,
  //             compareEndDate: compareEndDate,
  //           },
  //         ];
  //       }
  //       localStorage.setItem(
  //         "COMPARISSONS_DONE",
  //         JSON.stringify(parsedStorage)
  //       );
  //     } else
  //       localStorage.setItem(
  //         "COMPARISSONS_DONE",
  //         JSON.stringify([
  //           {
  //             id,
  //             compareId,
  //             compareStartDate: compareStartDate,
  //             compareEndDate: compareEndDate,
  //           },
  //         ])
  //       );
  //   }
  // }, [comparedClientData]);

  return (
    <>
      <SummaryWrapper
        data={clientData}
        title={
          clientsData?.clients.find((client) => client.id === id)?.name ??
          "" + " Summary Dashboard"
        }
        compareTo={comparedClientData}
        setCompareId={setCompareId}
        clientId={id}
        compareId={compareId}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        isLoading={isLoading}
        compareStartDate={compareStartDate}
        compareEndDate={compareEndDate}
        setCompareStartDate={setCompareStartDate}
        setCompareEndDate={setCompareEndDate}
      />
    </>
  );
};
