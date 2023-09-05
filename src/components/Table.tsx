import { useTable } from "react-table";

type TableProps = {
  tableProps?: object;
  data: Array<any>;
  columns: Array<any>;
};

export default function Table({ data, columns, tableProps }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
      ...tableProps,
    });

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
