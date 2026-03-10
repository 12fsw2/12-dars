const AuthSchema = require("../schema/auth.schema");
const CarSchema = require("../schema/car.schema");
const CategorySchema = require("../schema/category.schema");
const CustomErrorHandler = require("../error/custom-error.handler");

// Profilni olish
const getProfile = async (req, res, next) => {
  try {
    const foundedUser = await AuthSchema.findById(req["user"].id);

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    let profileData = {
      id: foundedUser._id,
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      createdAt: foundedUser.createdAt
    };

    // Admin bo'lsa qo'shgan category va mashinalar ko'rinadi
    if (foundedUser.role === "admin") {
      const categories = await CategorySchema.find({ createdBy: foundedUser._id });
      const cars = await CarSchema.find({ createdBy: foundedUser._id }).populate("category", "name");

      profileData.categories = categories;
      profileData.cars = cars;
    }

    res.status(200).json(profileData);
  } catch (error) {
    next(error)
  }
};

// Profilni yangilash
const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.body;

    const foundedUser = await AuthSchema.findById(req["user"].id);

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (req.file) updateData.avatar = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await AuthSchema.findByIdAndUpdate(
      req["user"].id,
      updateData,
      { new: true }
    );

    res.status(200).json({ message: "Updated", data: updatedUser });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getProfile,
  updateProfile
};