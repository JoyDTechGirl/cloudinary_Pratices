const express = require("express");
require("dotenv").config();
require("./Config/database");

const PORT = process.env.PORT;
const userRouter = require("./Router/userRouter");
const app = express();
app.use(express.json());
app.use(userRouter);
// app.use("/", (req, res) => {
//   res.send("welcome");
// });

app.listen(PORT, () => {
  console.log(`My Server is Currently Running on port ${PORT}`);
});
