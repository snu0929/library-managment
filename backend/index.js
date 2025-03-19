const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const { auth } = require("./middleare/auth.middleware");
const { BookRouter } = require("./routes/book.routes");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use(cors());
// app.get("/check/auth", auth, async (req, res) => {
//   res.status(200).json("<h1>welcome to library management app</h1>");
// });
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", UserRouter);
app.use("/api/book", BookRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server is running on ${process.env.PORT}`);
});
