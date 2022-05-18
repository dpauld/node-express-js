const {
  customAPIError,
  BadRequestError,
  UnAuthenticatedError,
} = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError(`Please provide username or password`); //401
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({
    msg: `user created`,
    token: token,
  });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  const luckyNumber = Math.floor(Math.random() * 100);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new BadRequestError("No Token Provided"); //Status Code 400
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      msg: `Hello ${decode.username}`,
      secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new UnAuthenticatedError(`Not Authorised`); //401
  }
};

module.exports = { login, dashboard };
