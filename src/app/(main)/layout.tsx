import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import Header from "@/components/Header";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blogs",
      href: "/blogs",
    },
    {
      label: "Series",
      href: "/series",
    },
  ];

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="relative flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header user={user} links={links} />
        <main className="mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
