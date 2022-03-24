//Version2: TryCatch_ErrorHandlerMiddleWare_NoAsyncWrapper
//this version uses try catch and handles errors with middlewares. It does not use async wrapper.
//Where it has been use? : routes/task.js

const Task = require("../model/task");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    return next(error);
  }

  // res.send(`All Tasks`);
};

const getTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  try {
    // const task = await Task.find({ _id: taskId }).exec(); //find method returns an empty array if no item founds, does not return null
    const task = await Task.findOne({ _id: taskId }).exec(); //findById method returns null if no item found
    // const task = await Task.findById(taskId).exec(); //findById method returns null if no item found
    if (!task) {
      //!task works when task array is undefined or null,
      //!task.length works if the task array is empty, usefull when find() method is used
      return next(createCustomError(`No task is found with id ${taskId}`, 404));
    }
    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    // console.log(req.body);
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId }); //this method returns null if no item found
    if (!task) {
      //!task works if task is undefined or null
      return next(createCustomError(`No task is found with id ${taskId}`, 404));
    }
    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    }).exec(); //this method returns null if no item found
    // console.log(task);
    if (!task) {
      //!task works if task is undefined or null and !task.length works if the task array is empty
      return next(createCustomError(`No task is found with id ${taskId}`, 404));
    }
    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
