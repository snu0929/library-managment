const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log("error while connecting to db", err));

module.exports = {
  connection,
};
