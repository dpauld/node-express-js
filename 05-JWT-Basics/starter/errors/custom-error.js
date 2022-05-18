//this is a custom class used to throw all types of custom errors. Using this it becomes easier to handle different types of error with just if else condition based on their status code or based on the type of error (customAPIError or other error)
//Where it has been use? : middlewares/error-handler.js,  controllers/task.js

class customAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//create the custom error just by sending the message and the statusCode
const createCustomError = (message, statusCode) => {
  return new customAPIError(message, statusCode);
};

module.exports = { customAPIError, createCustomError };
