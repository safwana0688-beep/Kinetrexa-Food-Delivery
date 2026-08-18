const express = require("express");
const router = express.Router();

// Get all foods
router.get("/", (req, res) => {
  res.json([
    {
      _id: "507f1f77bcf86cd799439011",
      name: "Margherita Pizza",
      price: 299,
      category: "Pizza",
      description: "Classic cheese and tomato pizza",
      image: "/uploads/margherita-pizza.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439012",
      name: "Farmhouse Pizza",
      price: 399,
      category: "Pizza",
      description: "Loaded with fresh vegetables",
      image: "/uploads/farmhouse-pizza.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439013",
      name: "Chicken Burger",
      price: 249,
      category: "Burger",
      description: "Crispy chicken burger with fresh lettuce",
      image: "/uploads/chicken-burger.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439014",
      name: "Veg Burger",
      price: 199,
      category: "Burger",
      description: "Delicious vegetable burger with fresh toppings",
      image: "/uploads/veg-burger.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439015",
      name: "Chicken Biryani",
      price: 299,
      category: "Biryani",
      description: "Aromatic chicken biryani with flavorful spices",
      image: "/uploads/chicken-biryani.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439016",
      name: "Veg Biryani",
      price: 229,
      category: "Biryani",
      description: "Flavorful vegetable biryani with aromatic rice",
      image: "/uploads/veg-biryani.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439017",
      name: "White Sauce Pasta",
      price: 279,
      category: "Pasta",
      description: "Creamy white sauce pasta with herbs",
      image: "/uploads/white-sauce-pasta.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439018",
      name: "Chicken Pasta",
      price: 329,
      category: "Pasta",
      description: "Creamy pasta topped with juicy chicken",
      image: "/uploads/chicken-pasta.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439019",
      name: "French Fries",
      price: 149,
      category: "Sides",
      description: "Crispy golden french fries",
      image: "/uploads/French Fries.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439020",
      name: "Garlic Bread",
      price: 169,
      category: "Sides",
      description: "Toasted garlic bread with buttery herbs",
      image: "/uploads/Garlic Bread.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439021",
      name: "Chicken Wings",
      price: 299,
      category: "Sides",
      description: "Crispy and juicy chicken wings",
      image: "/uploads/chicken-wings.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439022",
      name: "Chocolate Milkshake",
      price: 199,
      category: "Drink",
      description: "Rich and creamy chocolate milkshake",
      image: "/uploads/chocolate-milkshake.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439023",
      name: "Mango Milkshake",
      price: 179,
      category: "Drink",
      description: "Fresh and creamy mango milkshake",
      image: "/uploads/mango-milkshake.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439024",
      name: "Coca Cola",
      price: 99,
      category: "Drink",
      description: "Chilled refreshing Coca Cola",
      image: "/uploads/coca-cola.jpg",
    },
    {
      _id: "507f1f77bcf86cd799439025",
      name: "Fresh Lime Soda",
      price: 129,
      category: "Drink",
      description: "Refreshing lime soda with fresh lime and mint",
      image: "/uploads/fresh-lime-soda.jpg",
    },
  ]);
});

router.get("/test", (req, res) => {
  res.json({
    message: "Food routes are working!",
  });
});

module.exports = router;