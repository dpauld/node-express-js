//this version uses the connectionString manually istead of using connectionString as an environment variable, to use this file in app.js just import this file, it will run automatically
//Where it has been use? : app.js

const mongoose = require("mongoose");
// require("dotenv").config();

const connectionString =
  "mongodb+srv://dipto:2468@nodeexpressprojects.thetp.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority"; //this is used as a default

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to databases..."))
  .catch((err) => console.log(err));
