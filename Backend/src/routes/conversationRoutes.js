const express = require("express");

const {
  createConversation,
  getConversations,
  deleteConversation,
} = require("../controllers/conversationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createConversation);

router.get("/", protect, getConversations);

router.delete("/:conversationId", protect, deleteConversation);

module.exports = router;