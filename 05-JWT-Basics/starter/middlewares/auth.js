//turorial link: https://youtu.be/rltfdjcXjmk?t=21800
const {
  customAPIError,
  BadRequestError,
  UnAuthenticatedError,
} = require("../errors");

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  //console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new BadRequestError("No Token Provided"); //Status Code 400
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decode);
    const { id, username } = decode;
    req.user = { id, username };
  } catch (error) {
    throw new UnAuthenticatedError(`Not Authorised`); //401
  }
  next();
};

module.exports = authMiddleware;
