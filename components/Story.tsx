"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { StoryItems } from "@/constants";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";

import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSLATE_AMOUNT = 300;

const Storys = () => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [translate]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden relative w-full lg:w-[740px]"
    >
      <div
        className="flex whitespace-nowrap lg:gap-3 gap-1 transition-transform"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {StoryItems.map((item) => (
          <div
            key={item.username}
            className="flex flex-col items-center"
            style={{ minWidth: "80px" }}
          >
            <Avatar className="w-16 h-16 border">
              <Image
                src={item.imageSrc}
                alt={item.username}
                layout="fill"
                sizes="100px"
                className="w-24 h-24 p-0.5 border-2 border-black rounded-full"
              />
            </Avatar>
            <p className="text-xs mt-1 text-gray-400">{item.username}</p>
          </div>
        ))}
      </div>

      {/* Navigacija */}
      {isLeftVisible && (
        <div className="absolute top-0 left-7 translate-y-3/4 z-10 opacity-70 hover:opacity-90 transition">
          <Button
            variant="story"
            size="storyIcon"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute top-0 right-7 translate-y-3/4 z-10 opacity-70 hover:opacity-90 transition">
          <Button
            variant="story"
            size="storyIcon"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Storys;
