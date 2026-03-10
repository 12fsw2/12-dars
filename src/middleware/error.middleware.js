const CustomErrorhandler = require("../error/custom-error.handler");

module.exports = function (err, req, res, next) {
  try {
    // Custom error
    if (err instanceof CustomErrorhandler) {
      return res.status(err.status || 400).json({
        message: err.message,
        errors: err.errors
      });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(e => e.message);

      return res.status(400).json({
        message: "Validation Error",
        errors: validationErrors
      });
    }

    // Boshqa xatolar
    return res.status(500).json({
      message: err.message || "Internal Server Error"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error handling failed"
    });
  }
};