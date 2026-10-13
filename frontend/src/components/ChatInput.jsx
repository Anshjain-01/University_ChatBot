import { useState } from "react";
import { sendMessage } from "../services/chatService";

const ChatInput = ({
  conversationId,
  onMessageSent,
  setIsGenerating,
   onConversationTitleUpdated,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const currentMessage = message;
    onConversationTitleUpdated(currentMessage);

    const userMessage = {
      _id: Date.now().toString(),
      role: "user",
      content: currentMessage,
    };

    onMessageSent(userMessage);
    setMessage("");

    setIsGenerating(true);

    try {
      const data = await sendMessage(
        conversationId,
        currentMessage
      );

      onMessageSent(data.data.assistantMessage);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
      <input
        type="text"
        placeholder="Ask your university question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;