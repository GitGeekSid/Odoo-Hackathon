const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getAll, create } = require("../controllers/notificationController");

router.get("/", protect, getAll);
router.post("/", protect, create);

module.exports = router;
