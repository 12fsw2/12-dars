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
const isAdmin = require("../middleware/isAdmin");
const { uploadCategoryImage } = require("../middleware/upload.middleware");

const categoryRouter = Router();

// Hammaga ochiq
categoryRouter.get("/get_all_categories", getAll);
categoryRouter.get("/get_one_category/:id", getOne);
categoryRouter.get("/get_category_cars/:id", getCategoryCars);

// Faqat admin
categoryRouter.post("/add_category", categoryValidatorMiddleware, authorization, isAdmin, uploadCategoryImage, create);
categoryRouter.put("/update_category/:id", authorization, isAdmin, uploadCategoryImage, update);
categoryRouter.delete("/delete_category/:id", authorization, isAdmin, remove);

module.exports = categoryRouter;