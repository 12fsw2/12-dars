const { Router } = require("express");
const {
  getAll,
  getOne,
  getCategoryCars,
  create,
  update,
  remove
} = require("../controller/category.controller");
const categoryValidatorMiddleware = require("../middleware/category.validator.middleware");
const authorization = require("../middleware/authorization");
const { uploadCategoryImage } = require("../middleware/upload.middleware");

const categoryRouter = Router();

// Barcha kategoriyalarni olish
categoryRouter.get("/get_all_categories", getAll);

// Yagona kategoriyani olish
categoryRouter.get("/get_one_category/:id", getOne);

// Kategoriyaga tegishli mashinalar
categoryRouter.get("/get_category_cars/:id", getCategoryCars);

// Yangi kategoriya qo'shish
categoryRouter.post("/add_category", categoryValidatorMiddleware, authorization, uploadCategoryImage, create);

// Kategoriyani yangilash
categoryRouter.put("/update_category/:id", authorization, uploadCategoryImage, update);

// Kategoriyani o'chirish
categoryRouter.delete("/delete_category/:id", authorization, remove);

module.exports = categoryRouter;