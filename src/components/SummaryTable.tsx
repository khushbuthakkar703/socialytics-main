import { Column, useTable } from "react-table";

type TableProps = {
  data: Array<object>;
  columns: Array<Column<object>>;
  tableProps?: object;
  darkTheme: boolean;
};

export default function SummaryTable(props: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: props.columns, data: props.data, ...props.tableProps });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full">
        <thead>
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
                      className="rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-xl px-4 py-6"
                    >
                      {column.render("Header")}
                    </th>
                  );
                } else if (index === headerGroup.headers.length - 1) {
                  return (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      className="rounded-tr-xl rounded-br-xl px-4 py-6"
                    >
                      {column.render("Header")}
                    </th>
                  );
                } else {
                  return (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-6"
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
              <tr key={i} {...row.getRowProps()} className={`border-b `}>
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
  );
}
