const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
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
    itemsku: {
      type: String,
      required: [true, "Please add an sku"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      trim: true
    },
    status: {
      type: String,
      default: "Pending",
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;