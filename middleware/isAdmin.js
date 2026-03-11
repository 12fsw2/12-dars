const CustomErrorHandler = require("../error/custom-error.handler")

module.exports = function(req, res, next) {
    try {
        if(req["user"].role !== "admin") {
            throw CustomErrorHandler.Forbidden("Sizda bu amalni bajarish huquqi yo'q")
        }
        next()
    } catch(error) {
        next(error)
    }
}