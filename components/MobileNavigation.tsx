import Image from "next/image";
import { MobileNavigationItems } from "@/constants";

const MobileNavigation = () => {
  return (
    <nav className="border-t w-full h-[52px] bg-white dark:bg-black md:hidden flex items-center justify-evenly">
      <ul className="flex items-center justify-center mx-2 gap-10">
        {MobileNavigationItems.map((item) => (
          <li
            key={item.icon}
            className="cursor-pointer flex flex-row items-center justify-center gap-2"
          >
            <Image
              src={item.icon}
              alt={item.icon}
              width={28}
              height={28}
              className="dark:fill-white filter dark:invert hover:scale-110 transition-all"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
