const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc Get all users
// @route GET /api/users/
// @access Private (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role:"member" }).select("-password");
    //add count to each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",  
        });

        return {
          ...user._doc, // including all existing user data
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(usersWithTaskCounts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private (admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Delete user by ID
// @route DELETE /api/users/:id
// @access Private (admin only)
const deleteUser = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};
