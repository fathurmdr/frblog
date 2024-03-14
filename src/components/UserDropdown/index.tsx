"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { MdLogout } from "react-icons/md";

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);

  return (
    <div
      onClick={() => setIsOpenDropdownUser(!isOpenDropdownUser)}
      className="relative"
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt="profile"
          height={40}
          width={40}
          className="cursor-pointer rounded-full"
        />
      ) : (
        <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black font-semibold text-white">
          {user?.name &&
            user.name
              .replace(/\b(\w)\w*\s*/g, (_: string, firstChar: string) =>
                firstChar.toUpperCase(),
              )
              .slice(0, 2)}
        </span>
      )}
      <div
        className={`${
          !isOpenDropdownUser && "hidden"
        } absolute right-0 top-0 translate-y-14 border border-stroke bg-graydark text-white shadow-4`}
      >
        <div className="flex items-center justify-between border-b border-white p-4">
          <p className="flex h-10 w-10 flex-1 items-center justify-center rounded-full bg-white text-black">
            {user?.name &&
              user.name
                .replace(/\b(\w)\w*\s*/g, (_: string, firstChar: string) =>
                  firstChar.toUpperCase(),
                )
                .slice(0, 2)}
          </p>
          <div className="ml-6 max-w-56 break-words">
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
        <div className="p-4">
          <button
            className="flex w-full items-center gap-2 hover:text-teal-400"
            onClick={() =>
              signOut().then(() => localStorage.removeItem("@isLogin"))
            }
          >
            <MdLogout className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
