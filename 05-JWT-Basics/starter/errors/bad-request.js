const { customAPIError } = require("./custom-error");

class BadRequestError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;
