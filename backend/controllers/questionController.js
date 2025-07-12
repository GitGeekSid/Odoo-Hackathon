const Question = require("../models/Question");

exports.create = async (req, res) => {
  const question = await Question.create({ ...req.body, user: req.user._id });
  res.json(question);
};

exports.getAll = async (req, res) => {
  const questions = await Question.find().populate("user").sort({ createdAt: -1 });
  res.json(questions);
};

exports.getOne = async (req, res) => {
  const q = await Question.findById(req.params.id).populate("user").populate({
    path: "answers",
    populate: { path: "user" }
  });
  res.json(q);
};
