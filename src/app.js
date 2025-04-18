const express = require("express");
const connectDb = require("./Config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("server running sucessfully");
    });
  })
  .catch((err) => {
    console.log("something went wrong");
  });
