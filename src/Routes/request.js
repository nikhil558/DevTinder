const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const ConnectionRequest = require("../Models/ConnectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      //Check Valid status
      const ALLOWED_STATUS = ["ignored", "intrested"];
      const isUpdationAllowed = ALLOWED_STATUS.includes(status);
      if (!isUpdationAllowed) {
        return res.status(400).send("INVALID status type: " + status);
      }

      // checking to user is found or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "Invalid request: userId not found",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exist",
          result: existingConnectionRequest,
        });
      }

      const connectionRequest = await new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} ${status} ${toUser.firstName}`,
        result: data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const logginUser = req.user;
      const { status, requestId } = req.params;

      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).send("Status not allowed!!");
      }

      const connection = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: logginUser,
        status: "intrested",
      });

      if (!connection) {
        return res.status(400).send("Connection request not found!!");
      }

      connection.status = status;
      const data = await connection.save();

      res.json({
        message: `${logginUser.firstName} ${status} request`,
        result: data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRouter;
