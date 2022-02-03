const mongoose = require("mongoose");

/* mongoose
  .connect(connectionString, {
    // useNewUrlParser: true, // these are not neccessary anymore
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB...");
  })
  .catch((err) => console.log(err)); */

const connectDB = (connectionString) => {
  return mongoose.connect(connectionString);
};

module.exports = connectDB;
