const notFound = (req, res) => {
  return res.status(404).json({ msg: "Page does not exist" });
};

module.exports = notFound;
