const CustomErrorHandler = require("../error/custom-error.handler")
const categoryValidator = require("../validator/category.validator")

module.exports = function(req, res, next) {
    const { error } = categoryValidator(req.body)

    if(error) {
      throw CustomErrorHandler.badRequest(error.message)
    }

    next()
}