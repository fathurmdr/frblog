"use client";

import { Post, User } from "@prisma/client";
import { postColumns } from "../constants";
import Table from "@/components/admin/Table";

interface PostTableProps {
  pagination: Pagination<Post & { author: User }>;
}

export default function PostTable({ pagination }: PostTableProps) {
  return (
    <Table className="mb-8" columns={postColumns} data={pagination.data} />
  );
}
