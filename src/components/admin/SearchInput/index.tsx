"use client";

import { FiSearch } from "react-icons/fi";

import { ChangeEvent, InputHTMLAttributes } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { setParam } from "@/utils/urlUtil";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isFocused?: boolean;
}
export default function SearchInput({
  className,
  isFocused,
  ...props
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      const params = new URLSearchParams(searchParams);

      setParam(params, "search", search);

      router.replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  return (
    <div
      className={`flex items-center overflow-hidden rounded border-[1.5px] border-stroke bg-transparent px-2 py-1 font-medium outline-none transition focus-within:border-primary active:border-primary disabled:cursor-not-allowed dark:border-form-strokedark dark:bg-form-input dark:focus-within:border-primary ${className} ${
        props.disabled && "bg-whiter"
      }`}
    >
      <span className="mx-1 peer-disabled:bg-whiter">
        <FiSearch className="text-xl" />
      </span>
      <input
        {...props}
        className={
          "peer w-full rounded bg-transparent p-1 font-medium outline-none transition disabled:cursor-not-allowed disabled:bg-whiter"
        }
        onChange={onSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
