const CustomErrorHandler = require("../error/custom-error.handler")
const carValidator = require("../validator/car.validator")

module.exports = function(req, res, next) {
    const { error } = carValidator(req.body)

    if(error) {
      throw CustomErrorHandler.badRequest(error.message)
    }

    next()
}