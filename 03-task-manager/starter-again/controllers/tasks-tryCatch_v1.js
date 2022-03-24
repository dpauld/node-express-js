//Version1: TryCatch_NoErrorHandlerMiddleWare_NoAsyncWrapper
//this version handles errors manually, no error handler middlewares used in it.
//Where it has been use? : routes/task.js

const Task = require("../model/task");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // res.send(`All Tasks`);
};

const getTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    // const task = await Task.find({ _id: taskId }).exec(); //find method returns an empty array if no item founds, does not return null
    const task = await Task.findOne({ _id: taskId }).exec(); //findById method returns null if no item found
    // const task = await Task.findById(taskId).exec(); //findById method returns null if no item found
    if (!task) {
      //!task works when task array is undefined or null,
      //!task.length works if the task array is empty, usefull when find() method is used
      return res
        .status(404)
        .json({ msg: `No task is found with id ${taskId}` });
    }
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    // console.log(req.body);
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId }); //this method returns null if no item found
    if (!task) {
      //!task works if task is undefined or null
      return res
        .status(404)
        .json({ msg: `No task is found with id ${taskId}` });
    }
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    }).exec(); //this method returns null if no item found
    // console.log(task);
    if (!task) {
      //!task works if task is undefined or null and !task.length works if the task array is empty
      return res
        .status(404)
        .json({ msg: `No task is found with id ${taskId}` });
    }
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
