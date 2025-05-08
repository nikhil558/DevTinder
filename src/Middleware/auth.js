const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (isAuthorized) {
    next();
  } else {
    res.status(400).send("Unauthorized");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decoded = jwt.verify(token, "Devtinder@123");
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { adminAuth, userAuth };
