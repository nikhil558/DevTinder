const express = require("express");
const { userAuth } = require("../Middleware/auth");
const { Chat } = require("../Models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      paticipents: { $all: [userId, targetUserId] },
    });

    if (!chat) {
      chat = new Chat({
        paticipents: [userId, targetUserId],
        message: [],
      });
    }

    await chat.save();

    res.send({
      message: "Chat fetched successfully",
      chat,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = chatRouter;
