import { Post, User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { deletePost } from "./actions";
import { ColumnTypes } from "@/components/admin/Table";

export const postColumns: ColumnTypes<Post & { author: User }> = [
  {
    title: "Title",
    name: "title",
    width: "200px",
    textAlign: "left",
  },
  {
    title: "Author",
    name: "author.name",
    width: "150px",
    textAlign: "center",
  },
  {
    title: "Published",
    name: "isPublished",
    width: "200px",
    textAlign: "center",
    render: (text) => (text ? "Published" : "Not Published"),
  },
  {
    title: "Published At",
    name: "publishedAt",
    width: "200px",
    textAlign: "center",
    render: (text) => (text ? dayjs(text).format("DD MMM, YY") : "-"),
  },
  {
    name: "action",
    width: "160px",
    textAlign: "center",
    render: (_, record) => (
      <>
        <Link
          href={`posts/${record?.id}/edit`}
          className="flex items-center justify-center"
          title="Edit"
        >
          <HiOutlinePencil className="text-xl text-success" />
        </Link>
        <span className="px-2">|</span>
        <form action={deletePost}>
          <input type="hidden" name="id" defaultValue={record?.id} />
          <button
            type="submit"
            className="flex items-center justify-center"
            title="Delete"
          >
            <HiOutlineTrash className="text-xl text-danger" />
          </button>
        </form>
      </>
    ),
  },
];
