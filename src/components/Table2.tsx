import { Column, useTable } from "react-table";
type TableProps = {
  data: Array<object>;
  columns: Array<Column<object>>;
  darkTheme: boolean;
  tableProps?: object;
};
export default function Table2(props: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: props.columns, data: props.data, ...props.tableProps });
  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="w-full border-separate border-spacing-y-4"
      >
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr
              key={headerGroup.getHeaderGroupProps().key}
              {...headerGroup.getHeaderGroupProps()}
              className="font-normal text-[#676767]"
            >
              {headerGroup.headers.map((column: any, index: any) => {
                if (index === 0) {
                  return (
                    <th
                      key={index}
                      {...column.getHeaderProps()}
                      className="rounded-tl-xl rounded-bl-xl px-4 py-6"
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
                      key={index}
                      {...column.getHeaderProps()}
                      className="px-4 py-6"
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
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                key={row.getRowProps().key}
                {...row.getRowProps()}
                className={`my-4 ${
                  props.darkTheme ? "bg-blue-900" : "bg-gray-200"
                }`}
              >
                {row.cells.map((cell: any, index: any) => {
                  if (index === 0) {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="rounded-tl-xl rounded-bl-xl"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  } else if (index === row.cells.length - 1) {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="rounded-tr-xl rounded-br-xl"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  } else {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
