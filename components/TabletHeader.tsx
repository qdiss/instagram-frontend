import { TabletSidebarItems } from "@/constants";
import { cn } from "@/lib/utils";
import { InstagramIcon, Menu, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DarkMode } from "./DarkMode";

type TabletHeaderProps = {
  className?: string;
};

const TabletHeader = ({ className }: TabletHeaderProps) => {
  return (
    <aside
      className={cn(
        "md:flex w-[72px] hidden h-full lg:hidden md:fixed left-0 top-0  border-r flex-col overflow-hidden",
        className
      )}
    >
      <InstagramIcon className="w-7 h-7 mx-auto mt-9 mb-6 dark:text-white text-black transition-all" />
      <nav className="flex flex-col items-center justify-between gap-y-4 px-2 h-full w-full mt-5">
        <ul className="flex items-center justify-center flex-col gap-y-4">
          {TabletSidebarItems.slice(0, 8).map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center justify-center w-full dark:text-white text-black transition-all  p-2 rounded-md hover:bg-gray-500/10"
            >
              <Image
                src={item.icon}
                alt={item.icon}
                width={26}
                height={26}
                className="dark:fill-white filter dark:invert hover:scale-110 transition-all"
              />
            </Link>
          ))}
        </ul>
        <ul className="mb-5 flex items-center justify-center flex-col space-y-4">
          <DarkMode />
          <Menu className="w-8 h-8 dark:text-white text-black transition-all" />
        </ul>
      </nav>
    </aside>
  );
};

export default TabletHeader;
