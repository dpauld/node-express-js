//This files defines the schemas of Task collections(database table) and returns the database model defined by those schemas. Usually mongodb database does not have any structure, whereas in case of coding structure is important. These unstructuredness can be removed with Mongoose Schema  Each schema maps to a MongoDB collection and defines the shape or structure of the documents within that collection. This is how, Everything in Mongoose starts with a `Schema`.
//Where it has been use? : controllers/task.js

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
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

module.exports = mongoose.model("Task", taskSchema); //when imported returns the database model defined by taskSchema
