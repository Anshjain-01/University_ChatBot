const express = require("express");
const {
  getCurrentUser,
  updateProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);

module.exports = router;