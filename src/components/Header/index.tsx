"use client";

import Link from "next/link";
import { User } from "next-auth";
import { MdClose, MdMenu } from "react-icons/md";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import UserDropdown from "../UserDropdown";

interface HeaderProps {
  user?: User;
  links?: { label: string; href: string }[];
}

export default function Header({ user, links = [] }: HeaderProps) {
  const [isOpenNav, setIsOpenNav] = useState(false);
  return (
    <header className="sticky flex h-20 justify-center border-b border-stroke px-8 shadow-3">
      <nav className="flex w-full max-w-screen-2xl items-center justify-between py-4">
        <div>
          <Link href="/" className="text-lg font-bold italic">
            FR Blog
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-4 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          {!user && (
            <Link
              href="/sign-in"
              className="rounded-md bg-black-2 px-2 py-1.5 text-white"
            >
              Sign In
            </Link>
          )}
          {user && <UserDropdown user={user} />}
          <button
            className="relative block h-10 w-10 sm:hidden"
            onClick={() => setIsOpenNav(!isOpenNav)}
          >
            <MdClose
              className={`${isOpenNav ? "scale-100" : "scale-0"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl transition-transform`}
            />
            <MdMenu
              className={`${!isOpenNav ? "scale-100" : "scale-0"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl transition-transform`}
            />
          </button>
          <Transition
            show={isOpenNav}
            as={Fragment}
            enter="duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <ul className="fixed left-0 top-0 flex h-screen w-4/5 max-w-52 flex-col bg-black p-5 text-white transition-transform sm:-translate-x-full">
              {links.map((link) => (
                <li key={link.href} className="py-4">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Transition>
        </div>
      </nav>
    </header>
  );
}
