"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";

const GRID_IMAGES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  imageId: i + 100,
  span: i % 5 === 0 ? "col-span-2 row-span-2" : "",
}));

const CATEGORIES = ["All", "Photos", "Videos", "Reels", "Shops", "People"];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full max-w-[935px] px-2 md:px-4 pb-20 lg:pb-4">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#0a0a0a] pt-2 pb-3">
        <div className="relative w-full max-w-sm mx-auto md:mx-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none dark:text-white placeholder:text-gray-500"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-3 gap-0.5 md:gap-1">
        {GRID_IMAGES.map((item) => (
          <div
            key={item.id}
            className={`relative aspect-square overflow-hidden cursor-pointer group ${item.span}`}
          >
            <Image
              src={`https://picsum.photos/seed/${item.imageId}/400/400`}
              alt={`explore-${item.id}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 33vw, 300px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
