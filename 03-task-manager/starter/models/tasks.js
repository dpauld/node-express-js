const mongoose = require("mongoose");

//without validation
// const TaskSchema = mongoose.Schema({
//   name: String,
//   completed: Boolean,
// });

// with validation
const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"], // "" or no name field provided in req body will cause app crash
    trim: true,
    maxlength: [20, "name can not be more than 20 charachters"], //try with name with 20+ charachter, app will crash, when the error is not catched
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Task", TaskSchema);
