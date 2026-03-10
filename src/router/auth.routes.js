const { Router } = require("express");
const {
  register,
  verify,
  login,
  forgotPassword,
  changePassword,
  logout
} = require("../controller/auth.controller");
const authorization = require("../middleware/authorization");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/forgot_password", forgotPassword);
authRouter.post("/change_password", changePassword);
authRouter.post("/logout", authorization, logout);

module.exports = authRouter;