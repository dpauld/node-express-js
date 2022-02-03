const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

//middlewares
app.use(express.static("./public"));
//parse json middleware,
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(notFound);

// app.get('/api/v1/tasks') - get all the tasks
//app.post("/api/v1/tasks") - create a new task
// app.localhost:3000/api/v1get('/api/v1/tasks/:id') - get single task
// app.patch('api/v1/taska/:id') - update single task
//app.delete('/api/v1/tasks/:id') - delete single task

port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error); // change password to trigger the catch block
  }
};

start();
