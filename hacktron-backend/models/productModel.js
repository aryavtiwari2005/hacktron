const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    },
    expiry: {
      type: String,
      required: [true, "Please add an expiry"],
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;