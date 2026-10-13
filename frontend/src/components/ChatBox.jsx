const ChatWindow = ({ messages, isGenerating }) => {
  return (
    <div className="border rounded-xl p-6 min-h-[300px] max-h-[500px] overflow-y-auto space-y-4">
      {messages.length === 0 && !isGenerating ? (
        <p className="text-gray-500 text-center">
          Start a conversation by asking a question.
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-xl ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))
      )}

      {isGenerating && (
        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-3 rounded-xl w-32">
            <div className="space-y-2 animate-pulse">
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;