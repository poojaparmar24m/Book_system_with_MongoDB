require("dotenv").config();
const express = require("express");
const dbConnection = require("./Database_connection");
// const userModel = require("./Model/User_model");
const userRouter = require("./router/User");
// const bookRouter = require("./router/Book");

const app = express();
dbConnection();

const Port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "server is running !",
  });
});

app.use("/users", userRouter);
// app.use("/books",bookRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    Message: "This Route Does not exist !",
  });
});

app.listen(Port, () => {
  console.log(`server is running on port : http://localhost:${Port}/`);
});
// http://localhost:8081/
