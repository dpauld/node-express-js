//this version uses the connectionString as an environment variable, to use it import the function connecDB from app.js and call connecDB with app listen function
//Where it has been use? : app.js

const mongoose = require("mongoose");

const connectDB = (connectionString) => {
  return mongoose.connect(connectionString);
};

module.exports = { connectDB };
