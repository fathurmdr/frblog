"use client";

import Link from "next/link";
import { User } from "next-auth";
import { MdClose, MdMenu } from "react-icons/md";
import { ReactNode, useState } from "react";
import Sidebar from "../Sidebar";
import { MenuSidebarProps } from "../MenuSidebar";
import UserDropdown from "@/components/UserDropdown";

interface HeaderAdminProps {
  user?: User;
  menus: MenuSidebarProps[];
  children: ReactNode;
}

export default function HeaderAdmin({
  user,
  menus,
  children,
}: HeaderAdminProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        menus={menus}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="relative block h-10 w-10 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MdClose
                  className={`${sidebarOpen ? "scale-100" : "scale-0"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl transition-transform`}
                />
                <MdMenu
                  className={`${!sidebarOpen ? "scale-100" : "scale-0"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl transition-transform`}
                />
              </button>
              <Link
                href="/admin"
                className="block flex-shrink-0 text-lg font-bold italic lg:hidden"
              >
                FR Blog
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {user && <UserDropdown user={user} />}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
