import React from "react";
import Skeleton from "react-loading-skeleton";
import { useTable } from "react-table";

type TableProps = {
  tableProps?: object;
  data: Array<any>;
  columns: Array<any>;
  nonLoadingRows?: number;
  className?: string;
  stickyHeader?: boolean;
};

export default function Table({
  data,
  columns,
  tableProps,
  nonLoadingRows = 0,
  className = "",
  stickyHeader = false,
}: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
      ...tableProps,
    });

  console.log(nonLoadingRows);

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table {...getTableProps()} className="w-full">
        <thead className={stickyHeader ? "sticky top-0" : ""}>
          {headerGroups.map((headerGroup: any, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
              className=" bg-blue-500 font-normal text-white"
            >
              {headerGroup.headers.map((column: any, index: any) => {
                if (index === 0) {
                  return (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      className="rounded-bl-xl rounded-tl-xl px-2 py-2 uppercase sm:px-4 sm:py-6"
                    >
                      {column.render("Header")}
                    </th>
                  );
                } else if (index === headerGroup.headers.length - 1) {
                  return (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      className="rounded-br-xl rounded-tr-xl px-2 py-2 uppercase sm:px-4 sm:py-6"
                    >
                      {column.render("Header")}
                    </th>
                  );
                } else {
                  return (
                    <th
                      {...column.getHeaderProps()}
                      className="px-2 py-2 uppercase sm:px-4 sm:py-6"
                      key={index}
                    >
                      {column.render("Header")}
                    </th>
                  );
                }
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                {i <= nonLoadingRows - 1 ? (
                  <tr key={i} {...row.getRowProps()} className={`border-b `}>
                    {row.cells.map((cell: any, i: number) => {
                      return (
                        <td key={i} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={columns.length}>
                      <Skeleton className={`min-h-[3rem] min-w-full`} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
