const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const authenticate = require("../middleware/authentication");
const mongoose = require("mongoose");
// Place Order
router.post("/place", authenticate, async (req, res) => {
  try {
    const { userId, items, address, phone, paymentMethod, totalAmount } =
      req.body;

    if (!items || !items.length || !address || !phone || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ FIX: Map items to match OrderSchema format
    const mappedItems = items.map((item) => ({
      productId: item._id || item.productId, // handle both cases
      quantity: item.quantity,
    }));

    const order = new Order({
      userId,
      items: mappedItems,
      address,
      phone,
      paymentMethod,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

router.get("/user/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId", "name discountedPrice");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    } 

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
