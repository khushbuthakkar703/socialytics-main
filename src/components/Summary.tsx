import { Column, useTable } from "react-table";
import Dropdown from "./Dropdown";
import React, { forwardRef, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "@/lib/stytch/useAuth";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "react-loading-skeleton";
import { clientGetClients } from "@/lib/api/client";
import { useQuery } from "react-query";

type SummaryProps = {
  title?: string;
  dark?: boolean;
  down?: boolean;
  summaryTitle?: string;
  data: Array<object>;
  columns: Array<Column<object>>;
  tableProps?: object;
  hideDropdown?: boolean;
  darkTheme?: string;
  clientId?: string;
  setCompareId?: (id: string) => void;
  compareId?: string;
  compareStartDate?: Date | null;
  compareEndDate?: Date | null;
  setCompareStartDate?: (date: Date) => void;
  setCompareEndDate?: (date: Date) => void;
  loading?: boolean;
};
interface UserClient {
  id: string;
  name: string;
}

const Summary = (props: SummaryProps) => {
  const skeletonSize = 5;

  const tableData = useMemo(
    () => (props.loading ? Array(skeletonSize).fill({}) : props.data),
    [props.loading, props.data]
  );
  const tableColumns = useMemo(
    () =>
      props.loading
        ? props.columns.map((column) => ({
            ...column,
            Cell: () => (
              <div className={`p-[1rem]`}>
                <Skeleton className={`min-h-[3rem] min-w-full`} />
              </div>
            ),
          }))
        : props.columns,
    [props.loading, props.columns]
  );

  const { data: clientsData, isLoading: clientsIsLoading } = useQuery(
    "clients",
    clientGetClients
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData, ...props.tableProps });
  const availableComparissons = clientsData?.clients ?? [];
  const [clientSelected, setClientSelected] = useState<UserClient | null>(
    availableComparissons.find((client) => client.id == props?.compareId) ??
      null
  );
  const handleSelected = (client: UserClient) => {
    setClientSelected(client);
    if (props.setCompareId) props.setCompareId(client.id);
  };

  const onChange = (dates: any) => {
    const [start, end] = dates;
    if (props.setCompareStartDate && props.setCompareEndDate) {
      props.setCompareStartDate(start);
      props.setCompareEndDate(end);
    }
  };

  const CustomInput = forwardRef(function customInput(
    { value, onClick }: any,
    ref: any
  ) {
    return (
      <div>
        <input
          className="inline-block w-fit cursor-pointer rounded-xl bg-[#D6EFFF] py-1.5 pr-5 text-start font-bold text-[#3080FE] placeholder-blue-500 outline-blue-400 sm:text-center"
          type="text"
          placeholder="Add date"
          defaultValue={value}
          onClick={onClick}
          ref={ref}
        />
        <div className="pointer-events-none absolute inset-y-0 right-[12px] flex items-center ">
          <RiArrowDropDownLine color="#3080FE" size={24} />
        </div>
      </div>
    );
  });

  return (
    <div
      className={`overflow-hidden rounded-xl p-0 transition-[1s] sm:p-0 ${
        props.dark ? " border-b-transparent bg-[#011B38] text-white" : ""
      }`}
    >
      <div>
        <div>
          <h2
            className={`p-0 pl-4 pt-3 font-bold sm:pl-9 sm:pt-6 ${
              props.hideDropdown
                ? "pb-6 text-[30px] sm:text-[52px]"
                : "pb-4 text-[25px]"
            }`}
          >
            {props.summaryTitle}
          </h2>
          {
            <div
              className={`${
                props.hideDropdown ? "hidden" : "flex"
              } m-0 mb-5 flex-wrap gap-2 sm:mb-2 sm:ml-5`}
            >
              <Dropdown
                title="Select another client..."
                defaultSelected={clientSelected}
                showSelected={!!clientSelected}
                itemKey="id"
                valueKey="name"
                data={availableComparissons}
                handleSelected={handleSelected}
              />
              <div className="w-fit cursor-pointer">
                <ReactDatePicker
                  dateFormat="(MM/dd)"
                  selected={props.compareStartDate}
                  onChange={onChange}
                  startDate={props.compareStartDate}
                  endDate={props.compareEndDate}
                  selectsRange
                  customInput={<CustomInput />}
                  maxDate={new Date()}
                />
              </div>
            </div>
          }
          <div>
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="w-full">
                <thead>
                  {headerGroups.map((headerGroup: any, i) => (
                    <tr
                      key={i}
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-blue-500 font-normal text-white"
                    >
                      {headerGroup.headers.map((column: any, index: any) => {
                        return (
                          <th
                            key={index}
                            {...column.getHeaderProps()}
                            className="rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl px-4 py-3 pl-9 text-start text-[24px] sm:py-4"
                          >
                            {props.title}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row: any, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={i}
                        {...row.getRowProps()}
                        className={`border-b `}
                      >
                        {row.cells.map((cell: any, i: number) => {
                          return (
                            <td key={i} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
