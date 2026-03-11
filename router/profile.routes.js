const { Router } = require("express");
const {
  getProfile,
  updateProfile
} = require("../controller/profile.controller");
const authorization = require("../middleware/authorization");
const { uploadAvatar } = require("../middleware/upload.middleware");

const profileRouter = Router();

profileRouter.get("/get_profile", authorization, getProfile);
profileRouter.put("/update_profile", authorization, uploadAvatar, updateProfile);

module.exports = profileRouter;