const Answer = require("../models/Answer");
const Question = require("../models/Question");

exports.postAnswer = async (req, res) => {
    const answer = await Answer.create({
        content: req.body.content,
        user: req.user._id,
        question: req.params.qid,
    });
    await Question.findByIdAndUpdate(req.params.qid, { $push: { answers: answer._id } });
    res.json(answer);
};
