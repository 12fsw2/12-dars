const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../error/custom-error.handler");
const bcrypt = require("bcryptjs");
const sendMessage = require("../utils/send-email");
const { access_token, refresh_token } = require("../utils/jwt");


const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const foundedUser = await AuthSchema.findOne({ email })

    const code = Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")

    if (foundedUser) {
      await sendMessage(code, email)
      await AuthSchema.findByIdAndUpdate(foundedUser._id, {
        otp: code,
        otpTime: Date.now() + 600000
      })
      return res.status(200).json({ message: "Registered" })
    }

    const hashPassword = await bcrypt.hash(password, 12)

    await sendMessage(code, email)

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: code,
      otpTime: Date.now() + 600000
    })

    res.status(200).json({ message: "Registered" });
  } catch (error) {
    next(error)
  }
};


const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body
    const foundedUser = await AuthSchema.findOne({ email })

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    if (!foundedUser.otp) {
      throw CustomErrorHandler.UnAuthorized("Otp not found")
    }

    if (foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("Wrong otp")
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("Otp expired")
    }

    await AuthSchema.findByIdAndUpdate(foundedUser._id, { otp: "", otpTime: 0 })

    const accessToken = access_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })
    const refreshToken = refresh_token({ id: foundedUser._id, role: foundedUser.role, email: foundedUser.email })

    await AuthSchema.findByIdAndUpdate(foundedUser._id, { refreshToken })

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 15
    })

    res.status(200).json({
      message: "Success",
      accessToken
    });
  } catch (error) {
    next(error)
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const foundedUser = await AuthSchema.findOne({ email })

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    const check = await bcrypt.compare(password, foundedUser.password)

    if (check) {
      const code = Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")

      await sendMessage(code, email)

      await AuthSchema.findByIdAndUpdate(foundedUser._id, {
        otp: code,
        otpTime: Date.now() + 600000
      })

      res.status(200).json({ message: "Please check your email" });
    } else {
      throw CustomErrorHandler.UnAuthorized("Wrong password")
    }

  } catch (error) {
    next(error)
  }
};


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const foundedUser = await AuthSchema.findOne({ email })

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    const code = Array.from({ length: 6 }, () => Math.round(Math.random() * 6)).join("")

    await sendMessage(code, email)

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: code,
      otpTime: Date.now() + 600000
    })

    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    next(error)
  }
};


const changePassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body
    const foundedUser = await AuthSchema.findOne({ email })

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    if (!foundedUser.otp) {
      throw CustomErrorHandler.UnAuthorized("Otp not found")
    }
    if (foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("Wrong otp")
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("Otp expired")
    }

    const hashPassword = await bcrypt.hash(newPassword, 12)

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      password: hashPassword,
      otp: "",
      otpTime: 0,
      refreshToken: ""
    })

    res.clearCookie("refresh_token")

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error)
  }
};


const logout = async (req, res, next) => {
  try {
    const foundedUser = await AuthSchema.findOne({ email: req["user"].email })

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    res.clearCookie("refresh_token")

    await AuthSchema.findByIdAndUpdate(foundedUser._id, { refreshToken: "" })

    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error)
  }
};


module.exports = {
  register,
  verify,
  login,
  forgotPassword,
  changePassword,
  logout
}