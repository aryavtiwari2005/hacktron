const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);

module.exports = router;