const CustomErrorhandler = require("../error/custom-error.handler");
const CarSchema = require("../schema/car.schema");

const getAllCars = async (req, res) => {
    try {
        const cars = await CarSchema.find().populate("category", "name");
        res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOneCar = async (req, res) => {
    try {
        const { id } = req.params;
        const foundedCar = await CarSchema.findById(id).populate("category", "name");
        if (!foundedCar) {
            throw CustomErrorhandler.NotFound("Car not found")
        }
        res.status(200).json(foundedCar);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Mashina qo'shish
const addCar = async (req, res) => {
    try {
        const { title, brand, model, year, price, color, mileage, fuelType, transmission, bodyType, description, category, specs } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const images = {
            exterior: req.files?.exterior ? req.files.exterior.map(f => `/uploads/cars/${f.filename}`) : [],
            interior: req.files?.interior ? req.files.interior.map(f => `/uploads/cars/${f.filename}`) : []
        }

        const newCar = await CarSchema.create({title, brand, model, year, price, color, mileage, fuelType, transmission, bodyType, description, category, specs, images, createdBy: req["user"].id});

        res.status(201).json(newCar);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Mashinani yangilash
const updateCar = async (req, res) => {
    try {
        const { title, brand, model, year, price, color, mileage, fuelType, transmission, bodyType, description, category, specs } = req.body;
        const { id } = req.params;

        const foundedCar = await CarSchema.findById(id);
        if (!foundedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        const updateData = { title, brand, model, year, price, color, mileage, fuelType, transmission, bodyType, description, category, specs }

        if (req.files?.exterior) {
            updateData["images.exterior"] = req.files.exterior.map(f => `/uploads/cars/${f.filename}`)
        }
        if (req.files?.interior) {
            updateData["images.interior"] = req.files.interior.map(f => `/uploads/cars/${f.filename}`)
        }

        const updatedCar = await CarSchema.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedCar);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const search = async (req, res) => {
    try {
        const { searchingValue } = req.query;

        const result = await CarSchema.find({
            title: { $regex: searchingValue, $options: "i" },
        }).populate("category", "name");

        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Mashinani o'chirish
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const foundedCar = await CarSchema.findById(id);
        if (!foundedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        await CarSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted car" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCars,
    getOneCar,
    addCar,
    updateCar,
    deleteCar,
    search
};