const socket = require("socket.io");
const crypto = require("crypto");
const { send } = require("process");
const { Chat } = require("../Models/chat");

const createSecureRoom = (userId, targetUserId) => {
  const room = [userId, targetUserId].sort().join("_");
  return crypto.createHash("sha256").update(room).digest("hex");
};

const connectSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("jointChat", ({ firstName, userId, targetUserId }) => {
      const room = createSecureRoom(userId, targetUserId);
      socket.join(room);
      console.log(firstName + " joined room: " + room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const room = createSecureRoom(userId, targetUserId);

          // TODO: Check if userId and targetUserId are friends or connected

          let chat = await Chat.findOne({
            paticipents: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = await Chat({
              paticipents: [userId, targetUserId],
              message: [],
            });
          }
          chat.message.push({ senderId: userId, text });
          await chat.save();

          io.to(room).emit("receiveMessage", {
            firstName,
            senderId: userId,
            targetUserId,
            text,
          });
          console.log(`${firstName} sent a message: ${text}`);
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = connectSocket;
