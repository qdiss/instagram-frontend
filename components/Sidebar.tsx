"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { SidebarItems } from "@/constants";
import { DarkMode } from "./DarkMode";

import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r flex-col",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/vercel.svg"
          alt="Logo"
          width={140}
          height={100}
          className="bg-white mt-5 p-2"
        />
      </div>
      <nav className="flex flex-col gap-2">
        <ul className="h-full flex-col md:flex md:gap-4 flex items-start justify-center mt-10">
          {SidebarItems.slice(0, 8).map((item) => {
            const isActive = item.path === pathname;
            pathname;
            return (
              <li
                key={item.path}
                className={cn(
                  "hover:bg-gray-500/10 p-2 rounded-md  hidden w-full flex-col items-start md:flex",
                  isActive ? "" : ""
                )}
                //TODO FIX IS ACTIVE
              >
                <Link
                  href={item.path}
                  className="flex flex-row items-center justify-start gap-x-3 w-full dark:text-white text-black transition-all"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={28}
                    height={28}
                    className="dark:fill-white filter dark:invert"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center items-center mt-4"></div>
        <ul className="h-full flex-col md:flex md:gap-4 flex items-start justify-center mt-16">
          {SidebarItems.slice(8).map((item) => {
            const isActive = item.path === pathname;
            return (
              <li
                key={item.name}
                className={cn(
                  "hover:bg-gray-500/10 p-2 rounded-md  hidden w-full flex-col items-start gap-2 md:flex",
                  isActive ? "bg-blue" : "bg-red"
                )}
              >
                <div className="flex items-center justify-between w-full dark:text-white text-black">
                  <div className="flex gap-x-2 cursor-pointer">
                    <MenuIcon className="w-6 h-6 dark:text-white text-black" />
                    {item.name}
                  </div>

                  <DarkMode />
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
