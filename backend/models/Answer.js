const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    votes: [{ user: String, vote: Number }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", answerSchema);
