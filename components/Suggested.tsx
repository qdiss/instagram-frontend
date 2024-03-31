import Image from "next/image";

import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";

import Footer from "./Footer";
import { StoryItems } from "@/constants";

const Suggested = () => {
  return (
    <>
      <div className="flex flex-col w-1/2">
        <div className="h-96 hidden lg:flex flex-col ">
          {StoryItems.slice(0, 1).map((item) => (
            <div
              key={item.username}
              className="flex flex-row items-center justify-between w-full py-1"
            >
              <div className="flex flex-row items-center justify-center">
                <Avatar className="w-14 h-14  border z-10">
                  <Image
                    src={item.imageSrc}
                    alt={item.username}
                    layout="fill"
                    className="w-24 h-24 p-0.5 border-2 border-black rounded-full"
                  />
                </Avatar>
                <div className="flex flex-col text-sm ml-3">
                  <span className="text-black dark:text-white font-medium">
                    {item.username}
                  </span>
                  <p className="text-gray-400">𝖖𝖉𝖎𝖘𝖘</p>
                </div>
              </div>

              <Button
                size="small"
                variant="ghostLink"
                className="flex items-center justify-center"
              >
                Switch
              </Button>
            </div>
          ))}
          <div className="flex flex-row items-center justify-between py-2 text-sm">
            <p className="text-gray-400 font-medium">Suggested For You</p>
            <Button role="button" size="small" variant="suggested">
              See All
            </Button>
          </div>

          <div className="flex flex-col">
            {StoryItems.slice(1, 6).map((item) => (
              <div
                key={item.username}
                className="flex flex-row items-center justify-between w-full  py-1"
              >
                <div className="flex flex-row items-center justify-center">
                  <Avatar className="w-12 h-12  border z-10">
                    <Image
                      src={item.imageSrc}
                      alt={item.username}
                      layout="fill"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="flex flex-col text-xs ml-3">
                    <span className="text-black dark:text-white font-medium text-sm">
                      {item.username}
                    </span>
                    <p className="text-gray-400">Suggested For You</p>
                  </div>
                </div>

                <Button
                  size="small"
                  variant="ghostLink"
                  className="flex items-center justify-center"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Suggested;
