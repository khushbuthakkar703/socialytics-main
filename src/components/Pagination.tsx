interface PaginationProps {
  totalPages: number;
  page: number;
  setActualPage: (value: number) => void;
}

export const Pagination = ({
  totalPages,
  page,
  setActualPage,
}: PaginationProps) => {
  return (
    <div className="mt-5 flex w-full justify-end">
      <div className="flex">
        <button
          className="border p-2 px-4 text-[#3080FE] disabled:text-[#AFB2BC]"
          disabled={page == 0}
          onClick={() => setActualPage(page - 1)}
        >
          Prev
        </button>
        <button className="border p-2 px-4 text-[#3080FE]">{page + 1}</button>
        <button
          className="border p-2 px-4 text-[#3080FE] disabled:text-[#AFB2BC]"
          disabled={totalPages == page + 1}
          onClick={() => setActualPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
