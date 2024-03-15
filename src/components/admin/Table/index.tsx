"use client";

import _ from "lodash";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Spinner from "../Spinner";
import { setParam } from "@/utils/urlUtil";

interface Columns<T> {
  name: string;
  title?: string;
  width?: string;
  titleAlign?: "center" | "left" | "right";
  textAlign?: "center" | "left" | "right";
  sortDisabled?: boolean;
  render?: (text: string, record: T) => ReactNode;
}

export type ColumnTypes<T> = Columns<T>[];

export type RowSelectionTypes<T> = {
  selectedRows: T[];
  setSelectedRows: Dispatch<SetStateAction<T[]>>;
};

interface TableProps<T> {
  columns: ColumnTypes<T>;
  dataKeys?: string;
  data: T[];
  rowSelection?: RowSelectionTypes<T>;
  loading?: boolean;
  className?: string;
}

export default function Table<T>({
  columns,
  dataKeys = "id",
  data,
  rowSelection,
  loading = false,
  className,
}: TableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");
  const dir = searchParams.get("dir");

  function onSort({ sort, dir }: PaginationPayload) {
    const params = new URLSearchParams(searchParams);

    setParam(params, "sort", sort);
    setParam(params, "dir", dir);

    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-auto rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        <table className="w-full text-sm md:text-base">
          <thead className="border-b border-stroke bg-gray-2  dark:border-strokedark dark:bg-meta-4">
            <tr>
              {rowSelection && (
                <th
                  style={{
                    width: "48px",
                    minWidth: "48px",
                    textAlign: "center",
                  }}
                  className="whitespace-pre-line p-2.5 xl:p-5"
                >
                  <div className="flex w-full items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={
                        _.every(data, (row) =>
                          _.some(rowSelection.selectedRows, {
                            [dataKeys]: _.get(row, dataKeys),
                          }),
                        ) && rowSelection.selectedRows.length > 0
                      }
                      onChange={(e) => {
                        rowSelection.setSelectedRows((prevValue) => {
                          if (e.target.checked) {
                            return _.unionBy(prevValue, data);
                          }
                          return _.differenceBy(prevValue, data, dataKeys);
                        });
                      }}
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => {
                const isSort =
                  column.name.toLowerCase() !== "action" &&
                  !column.sortDisabled;

                return (
                  <th
                    key={index}
                    style={{
                      width: column.width,
                      minWidth: column.width,
                      textAlign: column.titleAlign ?? "center",
                    }}
                    className={`whitespace-pre-line p-2.5 xl:p-5 ${
                      sort === column.name && dir && "bg-dark bg-opacity-50"
                    }`}
                  >
                    <div
                      className={`flex w-full items-center justify-between ${
                        isSort && "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (isSort) {
                          if (sort === column.name && dir === "desc") {
                            return onSort({});
                          }
                          if (sort !== column.name) {
                            return onSort({
                              sort: column.name,
                              dir: "asc",
                            });
                          }
                          return onSort({
                            sort: column.name,
                            dir: "desc",
                          });
                        }
                      }}
                    >
                      <h5 className="w-full font-medium uppercase">
                        {column.title || column.name}
                      </h5>
                      {isSort && (
                        <div>
                          <MdArrowDropUp
                            className={`-mb-2 text-xl ${
                              sort === column.name &&
                              dir === "asc" &&
                              "text-primary"
                            }`}
                          />
                          <MdArrowDropDown
                            className={`-mt-2 text-xl ${
                              sort === column.name &&
                              dir === "desc" &&
                              "text-primary"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {data?.length > 0 &&
                data.map((row, indexRow) => (
                  <tr
                    className={`${
                      _.get(row, "isMarked") &&
                      "border-y border-white bg-[#ff4949]"
                    }`}
                    key={(_.get(row, dataKeys) as string) || indexRow}
                  >
                    {rowSelection && (
                      <td className=" p-2.5 xl:p-5">
                        <div
                          style={{ overflowWrap: "anywhere" }}
                          className={`flex justify-center whitespace-pre-line text-black dark:text-white`}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={_.some(rowSelection.selectedRows, {
                              [dataKeys]: _.get(row, dataKeys),
                            })}
                            onChange={(e) => {
                              rowSelection.setSelectedRows((prevValue) => {
                                if (e.target.checked) {
                                  return _.unionBy(prevValue, [row], "id");
                                }
                                return _.differenceBy(prevValue, [row], "id");
                              });
                            }}
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column, indexCol) => {
                      const isSort =
                        column.name.toLowerCase() !== "action" &&
                        !column.sortDisabled;
                      return (
                        <td
                          key={indexCol}
                          className={`p-2.5 xl:p-5 ${isSort && "pr-8 xl:pr-9"}`}
                        >
                          <div
                            style={{ overflowWrap: "anywhere" }}
                            className={`flex whitespace-pre-line dark:text-white ${
                              _.get(row, "isMarked")
                                ? "text-white"
                                : "text-black"
                            } ${
                              column.textAlign &&
                              `text-${column.textAlign} justify-${column.textAlign}`
                            }`}
                          >
                            {column.render
                              ? column.render(_.get(row, column.name), row)
                              : _.get(row, column.name) ?? "-"}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="h-18">
            <span className="absolute bottom-0 mx-auto mb-2 w-full p-4">
              <Spinner size="medium" />
            </span>
          </div>
        )}
        {!loading && (!data || data.length === 0) && (
          <div className="h-18">
            <span className="absolute bottom-0 mb-4 w-full p-4 text-center text-xl">
              Data not found!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
