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
const { uploadCarImages } = require("../middleware/upload.middleware");

const carRouter = Router();

// Barcha mashinalarni olish
carRouter.get("/get_all_cars", getAllCars);

carRouter.get("/search_car", search);

// Yagona mashinani olish
carRouter.get("/get_one_car/:id", getOneCar);

// Yangi mashina qo'shish
carRouter.post("/add_car", carValidatorMiddleware, authorization, uploadCarImages, addCar);

// Mashinani yangilash
carRouter.put("/update_car/:id", authorization, uploadCarImages, updateCar);

// Mashinani o'chirish
carRouter.delete("/delete_car/:id", authorization, deleteCar);

module.exports = carRouter;