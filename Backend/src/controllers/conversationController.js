const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      userId: req.user.userId,
      title: "New Chat",
    });

    res.status(201).json({
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create conversation",
      error: error.message,
    });
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user.userId,
    }).sort({ updatedAt: -1 });

    res.json({
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch conversations",
      error: error.message,
    });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findOneAndDelete({
      _id: conversationId,
      userId: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    await Message.deleteMany({
      conversationId,
    });

    res.json({
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete conversation",
      error: error.message,
    });
  }
};

module.exports = {
  createConversation,
  getConversations,
  deleteConversation,
};