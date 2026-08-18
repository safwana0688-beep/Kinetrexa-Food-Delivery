const express = require("express");
const Order = require("../models/Order");
const {
  authenticate,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create an order for the logged-in customer
router.post("/", authenticate, async (req, res) => {
  try {
    const { items, address, phone, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    if (!address || !phone) {
      return res.status(400).json({
        message: "Address and phone are required",
      });
    }

    const order = new Order({
      userId: req.user.id,
      items,
      address,
      phone,
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// Get only the logged-in customer's orders
router.get("/my", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get customer orders error:", error);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
});

// Get every order with customer details (admin only)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
});

// Update an order status (admin only)
router.put("/:id/status", authenticate, requireAdmin, async (req, res) => {
  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  try {
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

module.exports = router;