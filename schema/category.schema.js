const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
      unique: true,
      trim: true,
      set: (value) => value.trim()
    },

    description: {
      type: String,
      default: null
    },

    image: {
      type: String,
      default: null
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

module.exports = model("Category", categorySchema);