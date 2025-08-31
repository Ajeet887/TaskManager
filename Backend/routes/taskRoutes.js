const express = require('express');

const {protect, adminOnly} = require('../middlewares/authMiddleware');
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require('../controllers/taskController');

const router = express.Router();

// Task management 
router.get("/dashboard-data",protect, getDashboardData);
router.get("/user-dashboard-data",protect, getUserDashboardData);
router.get("/",protect, getTasks); // get all users tasks (admin: all, Users: assigned)
router.get("/:id",protect, getTaskById); // get task by id
router.post("/",protect, adminOnly, createTask); // create a new task (admin only)
router.put("/:id",protect, updateTask); // update task by id
router.delete("/:id",protect, adminOnly, deleteTask); // delete task by id(adminonly)
router.put("/:id/status",protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect, updateTaskChecklist); // update task checklist

module.exports = router;
