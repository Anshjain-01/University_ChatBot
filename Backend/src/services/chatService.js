const Message = require("../models/Message");

const saveUserMessage = async (conversationId, content) => {
  const message = await Message.create({
    conversationId,
    role: "user",
    content,
  });

  return message;
};

const saveAssistantMessage = async (conversationId, content) => {
  const message = await Message.create({
    conversationId,
    role: "assistant",
    content,
  });

  return message;
};

module.exports = {
  saveUserMessage,
  saveAssistantMessage,
};