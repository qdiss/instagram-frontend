"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, Music2, MoreHorizontal, Volume2, VolumeX, Play, Pause } from "lucide-react";

const USERS = [
  { username: "qdiss.zip", avatar: "/user1.jpg" },
  { username: "qdiss.exe", avatar: "/user2.jpg" },
  { username: "instagram", avatar: "/instagram.png" },
  { username: "github", avatar: "/github.webp" },
  { username: "discord", avatar: "/user4.jpg" },
];

const CAPTIONS = [
  "POV: you found the best spot in the city 🏙️",
  "this filter hits different at 2am 🌙",
  "tell me you're a vibe without telling me 🔥",
  "day in my life ✨ (swipe for more)",
  "the algorithm brought you here for a reason 💫",
];

const SONGS = [
  "Travis Scott - TELEKINESIS",
  "Drake - Search & Rescue",
  "The Weeknd - Popular",
  "Kendrick Lamar - luther",
  "Future - WAIT FOR U",
];

const REELS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  imageId: i * 7 + 200,
  user: USERS[i % USERS.length],
  caption: CAPTIONS[i % CAPTIONS.length],
  song: SONGS[i % SONGS.length],
  likes: 1000 + ((i * 2137) % 99000),
  comments: 50 + ((i * 31) % 9000),
  liked: false,
  saved: false,
}));

export default function ReelsPage() {
  const [reels, setReels] = useState(REELS);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setCurrentIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    el.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleLike = (id: number) =>
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, liked: !r.liked } : r)));

  const toggleSave = (id: number) =>
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r)));

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-0px)] overflow-y-scroll snap-y snap-mandatory scrollbar-none w-full max-w-[400px] mx-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          data-index={index}
          className="relative h-screen snap-start snap-always flex-shrink-0 overflow-hidden bg-black"
        >
          {/* Background image acting as "video" */}
          <Image
            src={`https://picsum.photos/seed/${reel.imageId}/400/700`}
            alt="reel"
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          {/* Pause overlay */}
          {paused && currentIndex === index && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/40 rounded-full p-4">
                <Play size={36} className="text-white fill-white" />
              </div>
            </div>
          )}

          {/* Click to pause */}
          <button
            className="absolute inset-0 z-10"
            onClick={() => currentIndex === index && setPaused((p) => !p)}
          />

          {/* Right actions */}
          <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-5">
            <button
              onClick={() => toggleLike(reel.id)}
              className="flex flex-col items-center gap-1"
            >
              <Heart
                size={28}
                className={reel.liked ? "fill-red-500 stroke-red-500" : "stroke-white"}
              />
              <span className="text-white text-xs font-medium">
                {reel.liked ? reel.likes + 1 : reel.likes}
              </span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle size={28} className="stroke-white" />
              <span className="text-white text-xs font-medium">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Send size={28} className="stroke-white" />
              <span className="text-white text-xs font-medium">Share</span>
            </button>
            <button onClick={() => toggleSave(reel.id)} className="flex flex-col items-center gap-1">
              <Bookmark
                size={28}
                className={reel.saved ? "fill-white stroke-white" : "stroke-white"}
              />
            </button>
            <button className="flex flex-col items-center gap-1">
              <MoreHorizontal size={28} className="stroke-white" />
            </button>
            {/* Spinning avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white mt-1">
              <Image
                src={reel.user.avatar}
                alt={reel.user.username}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-3 right-20 z-20">
            <p className="text-white font-semibold text-sm mb-1">{reel.user.username}</p>
            <p className="text-white text-sm mb-2 line-clamp-2">{reel.caption}</p>
            <div className="flex items-center gap-2">
              <Music2 size={14} className="text-white flex-shrink-0" />
              <p className="text-white text-xs truncate">{reel.song}</p>
            </div>
          </div>

          {/* Top controls */}
          <div className="absolute top-4 right-4 z-20 flex gap-3">
            <button onClick={() => setMuted((m) => !m)}>
              {muted
                ? <VolumeX size={22} className="text-white" />
                : <Volume2 size={22} className="text-white" />
              }
            </button>
          </div>
          <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
            <p className="text-white font-semibold text-base tracking-wide">Reels</p>
          </div>
        </div>
      ))}
    </div>
  );
}
