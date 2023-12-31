require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/users/user.router");
const app = express();
const port = process.env.PORT || 4500;
const questionRouter = require("./server/api/questions/question.router");
const answerRouter = require("./server/api/answers/answer.router");

app.use(
  cors({
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answer", answerRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
