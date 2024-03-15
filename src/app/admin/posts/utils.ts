import prisma from "@/lib/prisma";

export async function getPosts({
  page,
  size,
  sort,
  dir,
  search,
}: PaginationPayload) {
  const result = await prisma.post.getList({
    page,
    size,
    sort,
    dir,
    search,
    searchFields: ["title", "author.name"],
    include: {
      author: true,
    },
  });

  return result;
}
