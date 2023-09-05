import Table from "./Table";
import { useMemo } from "react";

interface DataTableProps {
  data: any;
  loading?: boolean;
  skeletonSize?: number;
  className?: string;
  cachedRowsQty: number;
  moreLoading?: boolean;
  columns: any;
}

export const DataTable = ({
  data,
  loading = false,
  skeletonSize = 5,
  className = "",
  cachedRowsQty = 0,
  moreLoading = false,
  columns,
}: DataTableProps) => {
  const tableData = useMemo(
    () =>
      loading
        ? !moreLoading
          ? Array(skeletonSize).fill({})
          : data
          ? [...data, ...Array(skeletonSize).fill({})]
          : Array(skeletonSize).fill({})
        : data,
    [loading, data, moreLoading]
  );
  const tableColumns = useMemo(() => columns, [loading, columns, moreLoading]);

  return (
    <div className={className}>
      {tableData && tableColumns && (
        <Table
          columns={tableColumns}
          data={tableData}
          nonLoadingRows={cachedRowsQty}
          className="max-h-[45rem] overflow-y-auto"
          stickyHeader
        />
      )}
    </div>
  );
};
