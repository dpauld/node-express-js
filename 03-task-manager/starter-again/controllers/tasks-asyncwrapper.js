////Version3: TryCatch_ErrorHandlerMiddleWare_AsyncWrapper
//this version uses async wrapper to avoid writing try catch on each request. Also it handles errors with middlewares.
//Where it has been use? : routes/task.js

const Task = require("../model/task");
const asyncWrapper = require("../middlewares/async-wrapper");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId }).exec();
  if (!task) {
    return next(createCustomError(`No task is found with id ${taskId}`, 404));
  }
  return res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
  // console.log(req.body);
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId }); //this method returns null if no item found
  if (!task) {
    //!task works if task is undefined or null
    return res.status(404).json({ msg: `No task is found with id ${taskId}` });
  }
  return res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  }).exec(); //this method returns null if no item found
  // console.log(task);
  if (!task) {
    //!task works if task is undefined or null and !task.length works if the task array is empty
    return res.status(404).json({ msg: `No task is found with id ${taskId}` });
  }
  return res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
