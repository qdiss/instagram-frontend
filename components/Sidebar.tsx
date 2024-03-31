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
        "flex h-full lg:w-[245px] lg:fixed left-0 top-0 px-4 border-r flex-col md:hidden",
        className
      )}
    >
      <nav className="flex flex-col gap-2 items-start justify-between h-full ">
        <Image
          src="/logo.png"
          alt="Logo"
          width={110}
          height={80}
          className="dark:hidden mt-8 mb-6 mx-1.5"
        />
        <Image
          src="/logo.png"
          alt="Logo"
          width={110}
          height={80}
          className="hidden dark:block dark:invert mt-8 mb-6 mx-1.5"
        />
        <ul className="h-full w-full flex-col md:flex md:gap-4 flex">
          {SidebarItems.slice(0, 8).map((item) => {
            const isActive = item.path === pathname;
            pathname;
            return (
              <li
                key={item.path}
                className={cn(
                  "hover:bg-gray-500/10 p-2 rounded-md  hidden w-full flex-col items-start md:flex",
                  isActive ? "font-bold" : "font-normal text-sm"
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
                    width={26}
                    height={26}
                    className="dark:fill-white filter dark:invert"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <li className="hover:bg-gray-500/10 p-2 rounded-md  hidden w-full flex-col items-start gap-2 md:flex justify-between mb-2">
          <div className="flex items-center justify-between w-full dark:text-white text-black cursor-pointer">
            <div className="flex gap-x-2 cursor-pointer">
              <MenuIcon className="w-6 h-6 dark:text-white text-black" />
              <p>More</p>
            </div>
            <DarkMode />
          </div>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
