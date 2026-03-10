const Joi = require("joi");

const carValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(200).required(),

    brand: Joi.string().min(1).max(100).required(),

    model: Joi.string().min(1).max(100).required(),

    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),

    price: Joi.number().min(0).required(),

    color: Joi.string().allow("").optional(),

    mileage: Joi.number().min(0).optional(),

    fuelType: Joi.string().valid("petrol", "diesel", "electric", "hybrid", "gas").optional(),

    transmission: Joi.string().valid("automatic", "manual").optional(),

    bodyType: Joi.string().valid("sedan", "suv", "hatchback", "coupe", "wagon", "minivan", "truck").optional(),

    description: Joi.string().min(10).allow("").optional(),

    category: Joi.string().required(),

    specs: Joi.object({
      engine: Joi.string().allow("").optional(),
      horsepower: Joi.number().optional(),
      seats: Joi.number().optional(),
      doors: Joi.number().optional()
    }).optional()
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = carValidator;