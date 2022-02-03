const notFound = (req, res) => {
  res
    .status(404)
    .send(
      '<h2>Page does not exist, go to <a href="index.html">Task Manager</a> <h2>'
    );
};

module.exports = notFound;
