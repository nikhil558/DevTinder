const mongoose = require("mongoose");

const connectionDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Nikhil:5PQBuwqOxsclvjxm@nikhil.p1op0.mongodb.net/devTinder"
  );
};

module.exports = connectionDb;
