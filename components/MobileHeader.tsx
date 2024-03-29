import Image from "next/image";
import { Input } from "./ui/input";
import { DarkMode } from "./DarkMode";

const MobileHeader = () => {
  return (
    <nav className="w-full h-[56px] border-b flex items-center justify-between md:hidden fixed z-50 bg-white dark:bg-black focus:mx-2">
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
      <div className="flex items-center justify-center gap-x-2 mr-2">
        <div className="relative">
          <Input
            placeholder="Search"
            type="search"
            className="z-0 pl-10 dark:bg-black dark:ring-black bg-white ring-white"
          />
          <Image
            src="/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="dark:fill-white filter dark:invert absolute left-3 top-2.5 z-10"
          />
        </div>
        <DarkMode />
        <Image
          src="/Like.svg"
          alt="Like"
          width={24}
          height={24}
          className="dark:fill-white filter dark:invert"
        />
      </div>
    </nav>
  );
};

export default MobileHeader;
