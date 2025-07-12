const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { create, getAll, getOne } = require("../controllers/questionController");

router.post("/", protect, create);
router.get("/", getAll);
router.get("/:id", getOne);

module.exports = router;
