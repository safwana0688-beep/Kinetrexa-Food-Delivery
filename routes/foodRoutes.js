const express = require("express");

const router = express.Router();

// Get all foods
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      category: "Pizza",
      description: "Classic cheese and tomato pizza"
    },
    {
      id: 2,
      name: "Farmhouse Pizza",
      price: 399,
      category: "Pizza",
      description: "Loaded with fresh vegetables"
    },
    {
      id: 3,
      name: "Chicken Burger",
      price: 249,
      category: "Burger",
      description: "Crispy chicken burger"
    }
  ]);
});

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Food routes are working!"
  });
});

module.exports = router;