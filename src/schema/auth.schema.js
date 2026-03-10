const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username berilishi shart"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username must be at most 30 characters"],
      set: (value) => value.trim(),
    },

    email: {
      type: String,
      required: [true, "Email berilishi shart"]
    },

    password: {
      type: String,
      required: [true, "Password berilishi shart"]
    },

    otp: {
      type: String,
      required: [true, "OTP berilishi shart"]
    },

    role: {
      type: String,
      default: "user",
    },

    otpTime: {
      type: Number,
      required: [true, "OTP vaqtini berish shart"]
    },

    refreshToken: {
      type: String,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model("Auth", authSchema);