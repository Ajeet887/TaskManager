const express = require('express');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// User management routes
router.get("/",protect, adminOnly, getUsers); // Get all users
router.get("/:id", protect, getUserById); // Get user by id
router.delete("/:id", protect, adminOnly, deleteUser); // Delete user by id

module.exports = router;