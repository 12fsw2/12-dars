const Joi = require("joi");

const categoryValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),

    description: Joi.string().min(5).allow("").optional()
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = categoryValidator;