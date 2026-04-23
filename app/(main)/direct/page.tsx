"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Edit, X } from "lucide-react";
import Link from "next/link";

const USERS = [
  { username: "qdiss.zip", avatar: "/user1.jpg", lastMsg: "Sent a photo 📸", time: "2m", unread: 3 },
  { username: "qdiss.exe", avatar: "/user2.jpg", lastMsg: "haha yoo bro 💀", time: "15m", unread: 0 },
  { username: "instagram", avatar: "/instagram.png", lastMsg: "Your story has ended", time: "1h", unread: 1 },
  { username: "github", avatar: "/github.webp", lastMsg: "Check out this repo!", time: "3h", unread: 0 },
  { username: "discord", avatar: "/user4.jpg", lastMsg: "You're in the server 🎮", time: "6h", unread: 0 },
  { username: "twitter", avatar: "/user5.jpg", lastMsg: "Seen", time: "1d", unread: 0 },
  { username: "snapchat", avatar: "/user6.png", lastMsg: "🔥 fire snap", time: "2d", unread: 2 },
  { username: "tiktok", avatar: "/user8.webp", lastMsg: "Watch this reel 🎵", time: "3d", unread: 0 },
];

export default function DirectPage() {
  const [query, setQuery] = useState("");
  const filtered = USERS.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[935px] mx-auto h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-bold text-xl dark:text-white">qdiss.zip</span>
          <button className="dark:text-white hover:text-gray-500 transition">
            <Edit size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
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
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-4">
          {["Primary", "General", "Requests"].map((tab, i) => (
            <button
              key={tab}
              className={`mr-6 pb-2 text-sm font-medium border-b-2 transition ${
                i === 0
                  ? "border-black dark:border-white dark:text-white"
                  : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((user) => (
            <Link
              key={user.username}
              href="/direct/inbox"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                {user.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{user.unread}</span>
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className={`text-sm dark:text-white ${user.unread > 0 ? "font-bold" : "font-normal"}`}>
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{user.time}</span>
                </div>
                <p className={`text-sm truncate ${user.unread > 0 ? "text-black dark:text-white font-semibold" : "text-gray-500"}`}>
                  {user.lastMsg}
                </p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
