import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { menus } from "./menus";
import HeaderAdmin from "@/components/admin/HeaderAdmin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="bg-gray transition-colors duration-500 ease-in-out">
      <HeaderAdmin user={user} menus={menus}>
        <main className="mx-auto w-full max-w-screen-3xl p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </HeaderAdmin>
    </div>
  );
}
