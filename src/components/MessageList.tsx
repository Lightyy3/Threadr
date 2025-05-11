/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

const MessageList = ({ receiverId }: { receiverId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${receiverId}`);
      const data = await res.json();
      if (res.ok) setMessages(data.messages);
    };

    fetchMessages();
  }, [receiverId]);

  return (
    <div className="message-list flex flex-col space-y-3 p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col max-w-[75%] text-sm ${
            msg.senderId === receiverId
              ? "self-start items-start text-white"
              : "self-end items-end text-white"
          }`}
        >
          <span className="text-xs text-white mb-1">
            {msg.sender?.username || "Unknown"}
          </span>
          <div
            className={`px-3 py-2 rounded-md ${
              msg.senderId === receiverId ? "bg-gray-800" : "bg-[#5A04FF]"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
