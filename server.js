require("dotenv").config();
const pool = require("./server/config/database");
const {
  registration,
  profile,
  question,
  answer,
} = require("./server/model/model");
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

const startApp = async (port) => {
  const connection = await pool.getConnection();
  console.log("db connection is established");
  try {
    await connection.query(registration);
    await connection.query(profile);
    await connection.query(question);
    await connection.query(answer);
    console.log(
      `registration table created,\n profile table created \n question table created \n answer table created`
    );
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
    connection.release();
  }
};

startApp(port);
