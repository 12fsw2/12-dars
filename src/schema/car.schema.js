const { Schema, model } = require("mongoose");

const Car = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [200, "Title must be at most 200 characters"],
      trim: true
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true
    },

    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be after 1900"],
      max: [new Date().getFullYear() + 1, "Year cannot be too far in the future"]
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"]
    },

    color: {
      type: String,
      trim: true,
      default: null
    },

    mileage: {
      type: Number,
      default: 0,
      min: [0, "Mileage must be positive"]
    },

    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: {
        values: ["petrol", "diesel", "electric", "hybrid", "gas"],
        message: "{VALUE} bunday qiymat qabul qilinmaydi"
      }
    },

    transmission: {
      type: String,
      required: [true, "Transmission is required"],
      enum: {
        values: ["automatic", "manual"],
        message: "{VALUE} bunday qiymat qabul qilinmaydi"
      }
    },

    bodyType: {
      type: String,
      enum: {
        values: ["sedan", "suv", "hatchback", "coupe", "wagon", "minivan", "truck"],
        message: "{VALUE} bunday qiymat qabul qilinmaydi"
      },
      default: null
    },

    description: {
      type: String,
      minlength: [10, "Description must be at least 10 characters"],
      trim: true,
      default: null
    },

    images: {
      exterior: [{ type: String }],
      interior: [{ type: String }]
    },

    specs: {
      engine: { type: String, default: null },
      horsepower: { type: Number, default: null },
      seats: { type: Number, default: null },
      doors: { type: Number, default: null }
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"]
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Auth"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const CarSchema = model("Car", Car);
module.exports = CarSchema;