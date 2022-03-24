//this errorHandlerMiddleware deals with server side, database errors caused inside the server due to wrong input by the user or any other while proccesing inside the server
//Where it has been use? : controllers/task.js

const { customAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof customAPIError) {
    return res.status(err.statusCode).json({ msg: err.message }); //
  }
  // return res.status(500).send("Something wrong");
  // return res.status(500).json({ msg: err.errors.name.message });
  return res.status(500).json({ msg: "Something went wrong, try again" });
};

module.exports = errorHandlerMiddleware;
