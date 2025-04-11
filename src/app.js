const express = require("express");
const { adminAuth, userAuth } = require("./Middleware/auth");

const app = express();

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("user logging successfully");
});

app.get("/user/data", userAuth, (req, res, next) => {
  try {
    throw new Error("dofonfn");
  } catch {
    res.send("user data error");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("error");
  }
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete user");
});

app.listen(3000, () => {
  console.log("server running sucessfully");
});
