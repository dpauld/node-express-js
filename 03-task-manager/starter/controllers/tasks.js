const { query } = require("express");
const Task = require("../models/tasks");

const createTask = async (req, res) => {
  //without catching the error
  // const task = await Task.create(req.body);
  //or
  // const task = await Task.create({
  //   name: req.body.name,
  //   completed: req.body.completed,
  // });

  //   //Alternative approach to handle error
  //   const task = await Task.create(req.body, function (error, name, completed) {
  //     if (error) return res.status(500).json(error);
  //     // saved!
  //   });
  //   res.status(201).json({ task });
  // };

  //catching the error
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task }); //201 for created
  } catch (error) {
    res.status(500).json({ msg: error });
    // res.status(501).json(error.errors.name.message);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); //200 for successfull ok
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//this is for learning by code with all options
const getTask_v1 = async (req, res) => {
  //for option 1 - 3 we dont need async keyword, we need it for option 4
  const taskId = req.params.id;
  // console.log(req.params.id);

  //Option1: with callback approach
  /* Task.findOne({ _id: taskId }, (err, task) => {
    res.json({ task });
  }); */

  //Option2: with .then method, works like promise then, but its is not a promise then
  /*  const task = Task.findOne({ _id: taskId }).then((task) => res.json({ task })); */

  //option3: using exec(), this method returns a promise and provide better stack trace
  /* Task.findOne({ _id: taskId })
    .exec() 
    .then((task) => res.json({ task })); */

  //option4: using async/await, then avoiding potention callback hell caused by callbacks, thenable and promise
  // const task = await Task.findOne({ _id: taskId }); //
  const task = await Task.findOne({ _id: taskId }).exec(); //with await and exec() we avoid callback hell, but can get better stack trace
  res.json({ task });
  // res.json({ id: req.params.id, msg: "Single Task Delivered" });
};

//this is for production
const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId }).exec();
    if (!task) {
      res.status(404).json({ msg: `There is no task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // Test id values: 1) (valid id, available, 24 hex) 61edd5352560f635d7cddf38 => success
  //                 2) (valid id, but not available, 24 hex) 61edd5352560f635d7cddf35 => not found
  //                 3) (invalid id with 23 hex) 61edd5352560f635d7cddf3 => cast error, maybe can not cast id less or more than 24 hex
  //                 4) (invalid id with 25 hex) 61edd5352560f635d7cddf389 => cast error
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId }); // findOneAndDelete()=> faster, as it uses the same mongodb function vs findOneAndRemove()=> little slow, as wraps up to another mongodb function
    if (!task) {
      res.status(404).json({ msg: `There is no task with id: ${taskId}` });
    }
    res.status(200).json({ task }); // peops use this
    // res.status(200).json({ task: null, status: "success" });// also often use this
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true, // default value is false. If its false returns the document with old values. otherwise returns updated one.
      runValidators: true, //if runValidators is false there will be no validation checking
    }).exec();
    if (!task) {
      return res.status(404).json({ task, msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // Test values: 1) Create a new task with named "testing UpdateTaskPatch"
  /*                const testPatchData = {
                      "name":"testing UpdateTaskPatch",
                      "completed": true
                    } */
  //                 2) now use that Id from database and update with following json value, only name will update, no change in others
  /*                const testPutData = {
                      "name":"testing editTaskPUT",
                    } */
};

//this is for put: by the definition of put method, it replaces the existing values when updating.
const editTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    // const { name, completed } = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true, // default value is false, if its false returns the document with old values. otherwise returns updated one.
      runValidators: true, //if runValidators is false there will be no validation checking
      overwrite: true,
    }).exec();
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // Test values: 1) Create a new task with named "testing editTaskPUT"
  /*                const testPutData = {
                      "name":"testing editTaskPUT",
                      "completed": true
                    } */
  //                 2) now use that Id from database and update with following json value,
  //                 you will find that completed will be replaced with default value, that means put replaces existing values for update
  /*                const testPutData = {
                      "name":"testing editTaskPUT",
                    } */

  //
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
