"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function deletePost(formData: FormData) {
  const id = formData.get("id");

  if (id) {
    await prisma.post.delete({ where: { id: Number(id) } });

    revalidatePath("/admin/posts");
  }
}
