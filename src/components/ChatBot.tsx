"use client";

import { useState } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      // Step 1: Deduct a token before calling the AI
      const tokenRes = await fetch("/api/tokens/use", { method: "POST" });

      if (tokenRes.status === 403) {
        alert("You're out of tokens. Please buy more to continue chatting.");
        setLoading(false);
        return;
      }

      if (!tokenRes.ok) {
        alert("Error checking tokens. Try again later.");
        setLoading(false);
        return;
      }

      // Step 2: Proceed with calling the AI
      const res = await fetch("https://api.cohere.ai/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-xlarge",
          prompt: input,
          max_tokens: 100,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { user: input, bot: data.text || "No response from AI" },
      ]);
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessages((prev) => [
        ...prev,
        { user: input, bot: "Something went wrong. Please try again." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-xlg mx-auto px-4 py-6">
      <div className="space-y-3 mb-4 text-sm text-white">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-1">
            <p className="text-gray-400">You:</p>
            <p>{msg.user}</p>
            <p className="text-gray-400">AI:</p>
            <p className="mb-2">{msg.bot}</p>
            <hr className="border-gray-700" />
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#8C3BFF] placeholder:text-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-sm text-white bg-[#8C3BFF] rounded-full hover:bg-[#6a2acc] transition"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
