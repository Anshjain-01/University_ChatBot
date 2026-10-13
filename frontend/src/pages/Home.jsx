import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import Sidebar from "../components/Sidebar";
import {
  getConversations,
  createConversation,
  getMessages,
} from "../services/chatService";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(data.conversations);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    loadConversations();
  }, []);

  const handleNewChat = async () => {
    try {
      const data = await createConversation();
      const newConversation = data.conversation;

      setConversations((prev) => [
        newConversation,
        ...prev,
      ]);

      setConversationId(newConversation._id);
      setMessages([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleMessageSent = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      message,
    ]);
  };

  const handleSelectConversation = async (selectedConversationId) => {
    try {
      const data = await getMessages(selectedConversationId);

      setConversationId(selectedConversationId);
      setMessages(data.messages);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleConversationDeleted = (deletedConversationId) => {
    setConversations((prev) =>
      prev.filter(
        (conversation) =>
          conversation._id !== deletedConversationId
      )
    );

    if (conversationId === deletedConversationId) {
      setMessages([]);
      setConversationId(null);
    }
  };

  const handleConversationTitleUpdated = (content) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (
          conversation._id === conversationId &&
          conversation.title === "New Chat"
        ) {
          return {
            ...conversation,
            title:
              content.length > 30
                ? content.substring(0, 30) + "..."
                : content,
          };
        }

        return conversation;
      })
    );
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      {/* Navbar stays at the top */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Remaining screen height */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar stays in place */}
        <div className="h-full shrink-0 overflow-hidden">
          <Sidebar
            conversations={conversations}
            onNewChat={handleNewChat}
            onSelectConversation={handleSelectConversation}
            onConversationDeleted={handleConversationDeleted}
          />
        </div>

        {/* Main chat area */}
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden px-4 py-4 md:px-6">
          <div className="mx-auto flex h-full min-h-0 max-w-5xl flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-sm md:p-6">
            {/* Header stays stationary */}
            <div className="shrink-0">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Welcome to University AI Assistant
              </h2>

              <p className="mt-2 text-gray-600">
                Ask questions about ABES Engineering College.
              </p>
            </div>

            {/* Chat section takes the remaining height */}
            <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="min-h-0 flex-1 overflow-hidden">
                <ChatWindow
                  messages={messages}
                  isGenerating={isGenerating}
                />
              </div>

              {/* Input stays at the bottom */}
              {conversationId && (
                <div className="shrink-0 pt-3">
                  <ChatInput
                    conversationId={conversationId}
                    onMessageSent={handleMessageSent}
                    setIsGenerating={setIsGenerating}
                    onConversationTitleUpdated={
                      handleConversationTitleUpdated
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;