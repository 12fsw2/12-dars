const CustomErrorHandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    try {
      const authorization = req.headers.authorization
      
      if(!authorization) {
        throw CustomErrorHandler.unauthorized("bearer token is not defined")
      }

      const bearer = authorization.split(" ")[0]
      const token = authorization.split(" ")[1]

      if(bearer !== "Bearer" || !token) {
        throw CustomErrorHandler.unauthorized("Token is required")
      }

      const decode = jwt.verify(token, process.env.SEKRET_KEY)
      req["user"] = decode

      next()
    } catch(error) {
      next(error)
    }
}