const express = require("express");
const { userAuth } = require("../Middleware/auth");
const ConnectionRequest = require("../Models/ConnectionRequest");
const User = require("../Models/user");

const userRouter = express.Router();
const User_Safe_Data = "firstName lastName about skills profileUrl";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: logginUser,
      status: "intrested",
    }).populate("fromUserId", User_Safe_Data);

    res.json({
      message: "Fetched data successfully",
      result: connectionRequests,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: logginUser, status: "accepted" },
        { fromUserId: logginUser, status: "accepted" },
      ],
    })
      .populate("toUserId", User_Safe_Data)
      .populate("fromUserId", User_Safe_Data);

    const data = connectionRequest.map((each) => {
      if (each.toUserId._id.toString() === logginUser._id.toString()) {
        return each.fromUserId;
      }
      return each.toUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;
    var limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const page = parseInt(req.query.page - 1) * limit || 0;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: logginUser._id }, { toUserId: logginUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const data = await User.find({
      _id: { $nin: Array.from(hideUserFromFeed) },
    })
      .skip(page)
      .limit(limit);

    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = userRouter;
