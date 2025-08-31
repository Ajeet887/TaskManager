const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { exportTaskReports, exportUserReports } = require('../controllers/reportController');

const router = express.Router();

router.get("/export/tasks",protect,adminOnly, exportTaskReports); // export all tasks as excel/pdf
router.get("/export/users",protect,adminOnly, exportUserReports); // export user-task report

module.exports = router;