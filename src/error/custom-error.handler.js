module.exports = class CustomErrorHandler extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  static UnAuthorized(message = "Unauthorized", errors = []) {
    return new CustomErrorHandler(401, message, errors);
  }

  static NotFound(message = "Not Found", errors = []) {
    return new CustomErrorHandler(404, message, errors);
  }

  static BadRequest(message = "Bad Request", errors = []) {
    return new CustomErrorHandler(400, message, errors);
  }

  static Forbidden(message = "Forbidden", errors = []) {
    return new CustomErrorHandler(403, message, errors);
  }

  static NoContent(message = "No Content") {
    return new CustomErrorHandler(204, message);
  }

  static InternalServerError(message = "Internal Server Error") {
    return new CustomErrorHandler(500, message);
  }
};