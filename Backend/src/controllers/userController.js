const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Authenticated",
      user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch user profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, department, studentId } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (department !== undefined) {
      user.department = department;
    }

    if (studentId !== undefined) {
      user.studentId = studentId;
    }

    await user.save();

    const updatedUser = await User.findById(
      req.user.userId
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or roll number already exists",
      });
    }

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

module.exports = { 
  getCurrentUser,
updateProfile
 };