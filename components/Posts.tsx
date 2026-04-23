"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from "lucide-react";

const USERS = [
  { username: "qdiss.zip", avatar: "/user1.jpg" },
  { username: "qdiss.exe", avatar: "/user2.jpg" },
  { username: "instagram", avatar: "/instagram.png" },
  { username: "github", avatar: "/github.webp" },
  { username: "discord", avatar: "/user4.jpg" },
  { username: "twitter", avatar: "/user5.jpg" },
  { username: "snapchat", avatar: "/user6.png" },
  { username: "tiktok", avatar: "/user8.webp" },
  { username: "youtube", avatar: "/user9.png" },
  { username: "linkedin", avatar: "/user10.png" },
];

const CAPTIONS = [
  "Golden hour never misses 🌅✨",
  "Living my best life fr 🔥",
  "Some days you just vibe 💫",
  "Not all who wander are lost 🗺️",
  "Good vibes only ✌️",
  "Chasing sunsets 🌇",
  "Life is short, make it sweet 🍬",
  "Out here making memories 📸",
  "Every day is a new adventure 🚀",
  "Stay humble, hustle hard 💪",
  "Aesthetic mode: activated 🎨",
  "Coffee first, everything else second ☕",
];

const COMMENTS = [
  ["fire pic 🔥", "love this!!"],
  ["so beautiful 😍", "goals 💯"],
  ["vibes ✨", "incredible shot"],
  ["this is everything 🙌", "obsessed"],
  ["literal perfection", "wow 😮"],
];

type Post = {
  id: number;
  imageId: number;
  user: { username: string; avatar: string };
  caption: string;
  likes: number;
  comments: string[];
  liked: boolean;
  saved: boolean;
  timeAgo: string;
};

const TIMES = ["2m", "15m", "1h", "3h", "6h", "12h", "1d", "2d"];

function generatePost(index: number): Post {
  const imageId = (index % 80) + 10;
  const user = USERS[index % USERS.length];
  return {
    id: index,
    imageId,
    user,
    caption: CAPTIONS[index % CAPTIONS.length],
    likes: 200 + ((index * 317) % 8800),
    comments: COMMENTS[index % COMMENTS.length],
    liked: false,
    saved: false,
    timeAgo: TIMES[index % TIMES.length],
  };
}

function PostCard({ post, onLike, onSave }: {
  post: Post;
  onLike: (id: number) => void;
  onSave: (id: number) => void;
}) {
  const [comment, setComment] = useState("");

  return (
    <article className="w-full max-w-[470px] border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
      <div className="flex items-center justify-between px-1 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-pink-500 ring-offset-1 ring-offset-white dark:ring-offset-black flex-shrink-0">
            <Image
              src={post.user.avatar}
              alt={post.user.username}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-white">{post.user.username}</p>
            <p className="text-xs text-gray-500">{post.timeAgo} ago</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-black dark:hover:text-white transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="w-full aspect-square relative bg-gray-100 dark:bg-gray-900 rounded-sm overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${post.imageId}/600/600`}
          alt="post"
          fill
          className="object-cover"
          sizes="470px"
        />
      </div>

      <div className="flex items-center justify-between px-1 pt-3 pb-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLike(post.id)}
            className="transition-transform hover:scale-110 active:scale-90"
          >
            <Heart
              size={24}
              className={post.liked ? "fill-red-500 stroke-red-500" : "dark:stroke-white"}
            />
          </button>
          <button className="transition-transform hover:scale-110">
            <MessageCircle size={24} className="dark:stroke-white" />
          </button>
          <button className="transition-transform hover:scale-110">
            <Send size={24} className="dark:stroke-white" />
          </button>
        </div>
        <button
          onClick={() => onSave(post.id)}
          className="transition-transform hover:scale-110"
        >
          <Bookmark
            size={24}
            className={post.saved ? "fill-black stroke-black dark:fill-white dark:stroke-white" : "dark:stroke-white"}
          />
        </button>
      </div>

      <p className="px-1 text-sm font-semibold dark:text-white">
        {post.liked ? post.likes + 1 : post.likes} likes
      </p>

      <div className="px-1 mt-1 text-sm dark:text-white">
        <span className="font-semibold mr-1">{post.user.username}</span>
        {post.caption}
      </div>

      {post.comments.length > 0 && (
        <div className="px-1 mt-1">
          <button className="text-xs text-gray-500">View all {post.comments.length} comments</button>
          {post.comments.slice(0, 1).map((c, i) => (
            <p key={i} className="text-sm dark:text-white">
              <span className="font-semibold mr-1">{USERS[(post.id + i + 1) % USERS.length].username}</span>
              {c}
            </p>
          ))}
        </div>
      )}

      <div className="px-1 mt-2 flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 pt-2">
        <Smile size={20} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 dark:text-white"
        />
        {comment && (
          <button
            onClick={() => setComment("")}
            className="text-sm font-semibold text-sky-500 hover:text-sky-400"
          >
            Post
          </button>
        )}
      </div>
    </article>
  );
}

const PAGE_SIZE = 4;

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>(() =>
    Array.from({ length: PAGE_SIZE }, (_, i) => generatePost(i))
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      if (start >= 80) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const newPosts = Array.from({ length: PAGE_SIZE }, (_, i) =>
        generatePost(start + i)
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((p) => p + 1);
      setLoading(false);
    }, 800);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const handleSave = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
  };

  return (
    <div className="w-full max-w-[470px] flex flex-col items-center px-2 md:px-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} onSave={handleSave} />
      ))}

      <div ref={loaderRef} className="w-full flex justify-center py-6">
        {loading && (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
        {!hasMore && (
          <p className="text-sm text-gray-400">You&apos;re all caught up 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
