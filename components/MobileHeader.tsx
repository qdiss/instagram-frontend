import Image from "next/image";
import { Input } from "./ui/input";
import { DarkMode } from "./DarkMode";
import { Heart } from "lucide-react";

const MobileHeader = () => {
  return (
    <nav className="w-full h-[56px] border-b flex items-center justify-between md:hidden fixed z-50 bg-white dark:bg-blue-500 mx-0 sm:mx-1">
      <div className="flex items-center w-full mx-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={110}
          height={80}
          className="mt-8 mb-6 mx-1.5 sm:ml-5 dark:hidden"
        />
        <Image
          src="/logo.png"
          alt="Logo"
          width={110}
          height={80}
          className="mt-8 mb-6 mx-1.5 sm:ml-5 ml-0 dark:block dark:invert hidden"
        />
      </div>
      <div className="flex items-center justify-center flex-grow gap-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search"
            type="search"
            className="z-0 pl-10 dark:bg-black dark:ring-black bg-white ring-white w-full"
          />
          <Image
            src="/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="dark:fill-white filter dark:invert absolute left-3 top-2.5 z-10"
          />
        </div>
        <div className="flex items-center justify-center mr-1 gap-x-2">
          <Heart className="h-6 w-6" />
        </div>
      </div>
    </nav>
  );
};

export default MobileHeader;
