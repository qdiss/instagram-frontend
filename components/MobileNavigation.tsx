import Image from "next/image";

import { MobileNavigationItems } from "@/constants";

const MobileNavigation = () => {
  return (
    <div className="border-t w-full h-[50px] bg-white dark:bg-black md:hidden flex items-center justify-evenly fixed bottom-0">
      <nav>
        <ul className="flex gap-x-[76px]">
          {MobileNavigationItems.map((item) => (
            <li key={item.icon} className="cursor-pointer ">
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
    </div>
  );
};

export default MobileNavigation;
