const express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/connect");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//json parser middleware
app.use(express.json());

app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);
app.get("/", (req, res) => {
  res.send("Taskmanager App");
});
//routes
// app.get("*", (req, res) => {
//   res.send("Page not found");
// });
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 5000 || process.env.PORT;
const connectionString = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(connectionString);
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
