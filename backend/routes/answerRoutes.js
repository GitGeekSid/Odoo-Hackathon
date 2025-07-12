const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { postAnswer } = require("../controllers/answerController");

router.post("/:qid", protect, postAnswer);

module.exports = router;
