"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Video, Info, Heart, Smile, Mic, ImageIcon, Send } from "lucide-react";

const CONTACT = { username: "qdiss.zip", avatar: "/user1.jpg", active: true };

type Message = {
  id: number;
  text: string;
  fromMe: boolean;
  time: string;
  liked: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: "yo bro what's good 🤙", fromMe: false, time: "10:00", liked: false },
  { id: 2, text: "not much just vibing, u?", fromMe: true, time: "10:01", liked: false },
  { id: 3, text: "same bro working on this project 💀", fromMe: false, time: "10:02", liked: false },
  { id: 4, text: "ayo that instagram clone??", fromMe: true, time: "10:03", liked: false },
  { id: 5, text: "yeah bro it's actually going crazy 🔥", fromMe: false, time: "10:04", liked: false },
  { id: 6, text: "send it when it's done fr", fromMe: true, time: "10:05", liked: false },
  { id: 7, text: "100% 🤝", fromMe: false, time: "10:05", liked: false },
];

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { id: Date.now(), text, fromMe: true, time, liked: false }]);
    setInput("");

    // Auto-reply after short delay
    setTimeout(() => {
      const replies = ["lol fr", "no way 😭", "bro 💀", "facts", "nah bro", "sheesh", "🔥🔥", "send it"];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, fromMe: false, time, liked: false }]);
    }, 1200);
  };

  const toggleLike = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
    );
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-[600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Link href="/direct" className="dark:text-white hover:text-gray-500 transition mr-1">
            <ArrowLeft size={22} />
          </Link>
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={CONTACT.avatar}
                alt={CONTACT.username}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            {CONTACT.active && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black" />
            )}
          </div>
          <div>
            <p className="font-semibold text-sm dark:text-white">{CONTACT.username}</p>
            {CONTACT.active && <p className="text-xs text-green-500">Active now</p>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="dark:text-white hover:text-gray-500 transition"><Phone size={22} /></button>
          <button className="dark:text-white hover:text-gray-500 transition"><Video size={22} /></button>
          <button className="dark:text-white hover:text-gray-500 transition"><Info size={22} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-white dark:bg-[#0a0a0a]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 group ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            {!msg.fromMe && (
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-1">
                <Image src={CONTACT.avatar} alt={CONTACT.username} width={28} height={28} className="object-cover" />
              </div>
            )}
            <div className="relative max-w-[70%]">
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm ${
                  msg.fromMe
                    ? "bg-[#3797F0] text-white rounded-br-sm"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-white rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              {msg.liked && (
                <div className={`absolute -bottom-2 ${msg.fromMe ? "left-2" : "right-2"}`}>
                  <Heart size={14} className="fill-red-500 stroke-red-500" />
                </div>
              )}
            </div>
            <button
              onClick={() => toggleLike(msg.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart size={16} className={msg.liked ? "fill-red-500 stroke-red-500" : "text-gray-400"} />
            </button>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
        <button className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
          <Smile size={26} />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent text-sm outline-none dark:text-white placeholder:text-gray-400"
          />
        </div>
        {input ? (
          <button
            onClick={sendMessage}
            className="text-[#3797F0] font-semibold text-sm hover:text-blue-400 transition"
          >
            Send
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
              <Mic size={22} />
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
              <ImageIcon size={22} />
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
              <Heart size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
