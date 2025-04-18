const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionReq", userAuth, async (req, res) => {
  res.send(req.user.firstName + " send connection request");
});

requestRouter.get("/user", async (req, res) => {
  try {
    const user = await User.findById("67f94de7f30576dd7f127cd7");
    // if (user.length === 0) {
    //   res.status(400).send("User not found");
    // } else {
    //   res.send(user);
    // }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

requestRouter.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete("67fa06c767223d7d3d77ebe6");
    res.send("Delete user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

requestRouter.patch("/user", async (req, res) => {
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(req.body.replace).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updation not allowed");
    }
    const user = await User.findOneAndUpdate(
      req.body.filter,
      req.body.replace,
      {
        runValidators: true,
      }
    );
    res.send("Update user data successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});

requestRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = requestRouter;
