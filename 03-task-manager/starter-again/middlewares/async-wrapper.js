//this asyncWrapper function is used with the controller functions to avoid using try catch(tackles error) everytime when writing a controller functions
//Where it has been use? : controllers/task.js

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
