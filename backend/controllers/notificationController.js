const Notification = require("../models/Notification");

exports.getAll = async (req, res) => {
    const notifs = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifs);
};

exports.create = async (req, res) => {
    const notif = await Notification.create({
        user: req.user._id,
        message: req.body.message
    });
    res.json(notif);
};
