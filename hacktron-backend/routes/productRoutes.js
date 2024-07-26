const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

module.exports = router;