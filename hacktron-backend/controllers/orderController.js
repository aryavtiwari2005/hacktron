const asyncHandler = require('express-async-handler')
const Order = require("../models/orderModel")
const Product = require("../models/productModel")

// Create Product
const createOrder = asyncHandler(async (req, res) => {
    const { name, quantity, itemsku } = req.body
    if (!name || !quantity || !itemsku) {
        console.log(req.body)
        res.status(400).json(`Please fill in all the fields.`);
    }

    const product = await Product.findOne({ itemsku: itemsku });
    if (!product) {
        res.status(500).json(`Product not found`)
    }
    if (product.quantity < quantity) {
        res.status(500).json("Item limit exceeded");
    }

    const productID = product._id;
    const productQuantity = product.quantity - quantity;

    const updatedProduct = await Product.findByIdAndUpdate(
        productID,
        {
            $set: {
                quantity: productQuantity
            }
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedProduct) {
        res.status(500).json("Order product managment failed")
    }

    const order = await Order.create({
        name,
        quantity,
        itemsku
    });

    res.status(201).json(order);
})

// Get all products
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort('-createdAt');
    res.status(200).json(orders);
});

// Get single product
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // if product doesnt exist
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }
    res.status(200).json(order);
});

// Delete Product
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    // if product doesnt exist
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted." });
});

// Update Product
const updateOrder = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    console.log(req.body)

    const order = await Order.findById(id);

    // if product doesnt exist
    if (!order) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Update Product
    const updatedOrder = await Order.findByIdAndUpdate(
        { _id: id },
        {
            name,
            quantity,
            itemsku,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedOrder);
});

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder,
};