require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const mainRouter = require("./routes/main");

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/", mainRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`app listening at port ${port}`);
    });
  } catch (error) {}
};

start();
