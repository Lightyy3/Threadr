"use client";
import ChatBot from "@/components/ChatBot";

export default function ChatBotPage() {
  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-xl py-2 mt-6 font-bold mb-4 bg-transparent border border-white gap-4 items-center text-white hover:text-black transition  sm:text-base md:text-xl rounded-full px-3 ">
        Chat Assistant
      </h1>
      <ChatBot />
    </div>
  );
}
