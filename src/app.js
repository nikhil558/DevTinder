const express = require("express");

const app = express();

app.use("/world", (req, res) => {
  res.send("Hello world!");
});

app.use("/test", (req, res) => {
  res.send("Testing");
});

app.use("/hello", (req, res) => {
  res.send("hello welcome");
});

app.listen(3000, () => {
  console.log("server running sucessfully");
});
