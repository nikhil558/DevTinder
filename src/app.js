const express = require("express");
const connectDb = require("./Config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");
const userRouter = require("./Routes/user");
const paymentRouter = require("./Routes/payment");
const connectSocket = require("./utils/socket");
const chatRouter = require("./Routes/chat");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
connectSocket(server);

connectDb()
  .then(() => {
    console.log("database connected successfully");
    server.listen(process.env.PORT, () => {
      console.log("server running sucessfully");
    });
  })
  .catch((err) => {
    console.log("something went wrong");
  });
