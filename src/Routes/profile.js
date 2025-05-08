const express = require("express");
const User = require("../Models/user");
const { userAuth } = require("../Middleware/auth");
const { validateUpdateProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateUpdateProfileData(req);
    const logginUser = await req.user;
    Object.keys(req.body).forEach((key) => {
      logginUser[key] = req.body[key];
    });
    logginUser.save();
    res.send(logginUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.post("/profile/password", userAuth, async (req, res) => {
  try {
    const logginUser = req.user;
    const oldPasswordValid = await logginUser.validatePassword(
      req.body.oldPassword
    );
    if (!oldPasswordValid) {
      throw new Error("Incorrect Old Password");
    } else if (req.body.oldPassword === req.body.newPassword) {
      throw new Error(
        "The new password cannot be the same as the old password. Please choose a different password"
      );
    }
    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    logginUser.password = hashPassword;
    logginUser.save();
    res.send("profile password changed successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
