"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { setParam } from "@/utils/urlUtil";

export interface PaginationProps {
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
  lastPage: number;
  total: number;
  optionPerPage?: string[];
  className?: string;
}

function Pagination({
  currentPage = 1,
  perPage = 0,
  from = 0,
  to = 0,
  lastPage = 0,
  total = 0,
  optionPerPage,
  className,
}: PaginationProps) {
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChangePagination({ page, size }: PaginationPayload) {
    const params = new URLSearchParams(searchParams);

    setParam(params, "page", page);
    setParam(params, "size", size);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={`flex items-center justify-between py-3 ${className}`}>
      <div className="flex flex-1 justify-between text-graydark dark:text-white sm:hidden">
        <button
          disabled={currentPage <= 1}
          onClick={() => onChangePagination({ page: currentPage - 1 })}
          className="border-gray-300 hover:bg-gray-50 relative inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium dark:bg-boxdark"
        >
          Previous
        </button>
        <button
          disabled={currentPage >= lastPage}
          onClick={() => onChangePagination({ page: currentPage + 1 })}
          className="border-gray-300 hover:bg-gray-50 relative ml-3 inline-flex items-center rounded-md border bg-white px-4 py-2 text-sm font-medium dark:bg-boxdark"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">{from}</span> to{" "}
            <span className="font-medium">{to}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={perPage}
            onChange={(e) =>
              onChangePagination({
                page: 1,
                size: Number(e.target.value),
              })
            }
            className="flex h-9 cursor-pointer items-center justify-center rounded-md border border-stroke  bg-inherit bg-white px-1 outline-none dark:border-strokedark dark:bg-boxdark"
          >
            {optionPerPage ? (
              optionPerPage.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </>
            )}
          </select>
          <span>per page</span>
          <button
            disabled={currentPage <= 1}
            onClick={() => onChangePagination({ page: currentPage - 1 })}
            className="disabled:text-gray-400 flex h-9 w-10 items-center justify-center rounded-md border border-stroke bg-white disabled:bg-whiter dark:border-strokedark dark:bg-boxdark"
          >
            <MdArrowBackIosNew />
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (1 <= Number(pageInput) && Number(pageInput) <= lastPage) {
                onChangePagination({
                  page: Number(pageInput),
                });
              } else {
                setPageInput(String(currentPage));
              }
            }}
          >
            <input
              type="text"
              name="pageInput"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (1 <= value && value <= lastPage) {
                  setPageInput(e.target.value);
                } else {
                  setPageInput(String(currentPage));
                }
              }}
              className="h-9 w-9 border-b border-stroke bg-transparent text-center outline-none dark:border-strokedark"
            />
          </form>
          <span>from {lastPage}</span>
          <button
            disabled={currentPage >= lastPage}
            onClick={() => onChangePagination({ page: currentPage + 1 })}
            className="disabled:text-gray-400 flex h-9 w-10 items-center justify-center rounded-md border border-stroke bg-white disabled:bg-whiter dark:border-strokedark dark:bg-boxdark"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
