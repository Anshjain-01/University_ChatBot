const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const {
  saveUserMessage,
  saveAssistantMessage,
} = require("../services/chatService");

const { generateAIResponse } = require("../services/aiService");

const createMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    const userMessage = await saveUserMessage(
      conversationId,
      content
    );
  const conversation = await Conversation.findOne({
  _id: conversationId,
  userId: req.user.userId,
});

if (conversation && conversation.title === "New Chat") {
  conversation.title =
    content.length > 30
      ? content.substring(0, 30) + "..."
      : content;

  await conversation.save();
}

    const aiResponse = await generateAIResponse(content);

    const assistantMessage = await saveAssistantMessage(
      conversationId,
      aiResponse
    );

    res.status(201).json({
      message: "Message created successfully",
      data: {
        userMessage,
        assistantMessage,
      },
    });
  } catch (error) {
    console.error("AI Error:", error.message);

    res.status(201).json({
      message: "Message saved",
      data: {
        userMessage: null,
        assistantMessage: {
          _id: Date.now().toString(),
          role: "assistant",
          content:
            "AI service is temporarily unavailable. Please try again.",
        },
      },
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: 1 });

    res.json({
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
};