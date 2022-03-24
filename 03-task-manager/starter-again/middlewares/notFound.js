////this is a errror handler middleware that activates when the user requests for page that does not exist.
//Where it has been use? : controllers/task.js

const notFound = (req, res) => {
  res
    .status(404)
    .send(
      '<h2>Page does not exist, go to <a href="index.html">Task Manager</a> <h2>'
    );
};

module.exports = notFound;
