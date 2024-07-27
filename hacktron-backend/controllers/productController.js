const asyncHandler = require('express-async-handler')
const Product = require("../models/productModel")

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    const { name, expiry, quantity, price, itemsku } = req.body
    if (!name || !quantity || !price) {
        console.log(req.body)
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const product = await Product.create({
        name,
        expiry,
        quantity,
        price,
        itemsku
    });

    res.status(201).json(product);
})

// Get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort('-createdAt');
    res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, quantity, price } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            quantity,
            price,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedProduct);
});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};