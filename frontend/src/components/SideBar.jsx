import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteConversation } from "../services/chatService";
import { getCurrentUser } from "../services/authservice";
const Sidebar = ({
  conversations,
  onNewChat,
  onSelectConversation,
  onConversationDeleted,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  loadUser();
}, []);

  const handleDelete = async (conversationId) => {
    try {
      await deleteConversation(conversationId);

      onConversationDeleted(conversationId);
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4 flex flex-col">
      
      <button
        onClick={onNewChat}
        className="w-full mb-6 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        + New Chat
      </button>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Previous Chats
      </h2>

      <div className="space-y-2 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            className="flex items-center gap-2"
          >
            <button
              onClick={() =>
                onSelectConversation(conversation._id)
              }
              className="flex-1 text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition truncate"
            >
              {conversation.title}
            </button>

            <button
              onClick={() =>
                handleDelete(conversation._id)
              }
              className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="Delete chat"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Profile */}
      <div className="mt-auto pt-4 border-t">
  <button
    onClick={() => navigate("/profile")}
    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition text-left"
  >
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-blue-600 font-semibold">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </span>
    </div>

    <div className="min-w-0">
      <p className="font-semibold text-gray-900 truncate">
        {user?.name || "User"}
      </p>

      <p className="text-xs text-gray-500 truncate">
        {user?.studentId || user?.email || "View profile"}
      </p>
    </div>
  </button>
</div>
    </aside>
  );
};

export default Sidebar;