const { text } = require("express");
const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const chatSchema = new mongoose.Schema(
  {
    paticipents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    message: [messageSchema],
  },
  { timeStamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };
