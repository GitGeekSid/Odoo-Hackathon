const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
    votes: [{ user: String, vote: Number }],
    acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
