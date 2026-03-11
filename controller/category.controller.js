const CustomErrorhandler = require("../error/custom-error.handler");
const CategorySchema = require("../schema/category.schema");
const CarSchema = require("../schema/car.schema");

const getAll = async (req, res) => {
  try {
    const categories = await CategorySchema.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      throw CustomErrorhandler.NotFound("Category not found")
    }
    res.status(200).json(foundedCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Kategoriyaga tegishli mashinalar
const getCategoryCars = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const cars = await CarSchema.find({ category: id }).populate("category", "name");
    res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Kategoriya qo'shish
const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const foundedCategory = await CategorySchema.findOne({ name });
    if (foundedCategory) {
      return res.status(400).json({ message: "Category already exist" });
    }

    const newCategory = await CategorySchema.create({
      name,
      description,
      image: req.file ? `/uploads/categories/${req.file.filename}` : null,
      createdBy: req["user"].id
    });

    res.status(201).json(newCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Kategoriyani yangilash
const update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updateData = { name, description };
    if (req.file) {
      updateData.image = `/uploads/categories/${req.file.filename}`;
    }

    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Kategoriyani o'chirish
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedCategory = await CategorySchema.findById(id);
    if (!foundedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await CategorySchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted category" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  getCategoryCars,
  create,
  update,
  remove
};