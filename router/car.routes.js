const { Router } = require("express");
const {
  getAllCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
  search
} = require("../controller/car.controller");
const carValidatorMiddleware = require("../middleware/car.validator.middleware");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const { uploadCarImages } = require("../middleware/upload.middleware");

const carRouter = Router();

// Barcha mashinalarni olish (hammaga ochiq)
carRouter.get("/get_all_cars", getAllCars);
carRouter.get("/search_car", search);
carRouter.get("/get_one_car/:id", getOneCar);

// Faqat admin
carRouter.post("/add_car", carValidatorMiddleware, authorization, isAdmin, uploadCarImages, addCar);
carRouter.put("/update_car/:id", authorization, isAdmin, uploadCarImages, updateCar);
carRouter.delete("/delete_car/:id", authorization, isAdmin, deleteCar);

module.exports = carRouter;