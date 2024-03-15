"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface PrimaryLinkProps extends LinkProps {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}
export default function PrimaryLink({
  className,
  disabled = false,
  children,
  ...props
}: PrimaryLinkProps) {
  return (
    <Link
      {...props}
      className={`flex justify-center rounded bg-primary p-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-primarydisabled ${className}`}
    >
      {children}
    </Link>
  );
}
