"use client";
import MessageInput from "@/components/MessageInput";
import MessageList from "@/components/MessageList";
import { useEffect, useState } from "react";

type Params = Promise<{ userId: string }>;

const ChatPage = ({ params }: { params: Params }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    };

    fetchParams();
  }, [params]);

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Chat</h1>
      <MessageList receiverId={userId} />
      <MessageInput receiverId={userId} />
    </div>
  );
};

export default ChatPage;
