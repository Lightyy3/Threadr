import MessageInput from "@/components/MessageInput";
import MessageList from "@/components/MessageList";

const ChatPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Chat</h1>
      <MessageList receiverId={params.userId} />
      <MessageInput receiverId={params.userId} />
    </div>
  );
};

export default ChatPage;
