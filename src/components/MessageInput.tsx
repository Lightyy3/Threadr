"use client";
import { useState } from "react";

const MessageInput = ({ receiverId }: { receiverId: string }) => {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, content: text }),
    });

    setText("");
    location.reload(); // Replace this with real-time update later
  };

  return (
    <div className="mt-4 flex gap-2 text-black">
      <input
        className="flex-1 bg-transparent border-b border-white focus:border-[#5A04FF] outline-none text-white placeholder-white px-1 py-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="border border-white text-white px-4 py-2 rounded-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
