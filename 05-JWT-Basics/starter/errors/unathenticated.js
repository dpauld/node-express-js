const { customAPIError } = require("./custom-error");

class UnAuthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnAuthenticatedError;
