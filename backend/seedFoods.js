const mongoose = require("mongoose");
const Food = require("./models/Food");
require("dotenv").config();

const foods = [
  {
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    description: "Classic cheese and tomato pizza",
    image: "/uploads/margherita-pizza.jpg",
  },
  {
    name: "Farmhouse Pizza",
    price: 399,
    category: "Pizza",
    description: "Loaded with fresh vegetables",
    image: "/uploads/farmhouse-pizza.jpg",
  },
  {
    name: "Chicken Burger",
    price: 249,
    category: "Burger",
    description: "Crispy chicken burger with fresh lettuce",
    image: "/uploads/chicken-burger.jpg",
  },
  {
    name: "Veg Burger",
    price: 199,
    category: "Burger",
    description: "Delicious vegetable burger with fresh toppings",
    image: "/uploads/veg-burger.jpg",
  },
  {
    name: "Chicken Biryani",
    price: 299,
    category: "Biryani",
    description: "Aromatic chicken biryani with flavorful spices",
    image: "/uploads/chicken-biryani.jpg",
  },
  {
    name: "Veg Biryani",
    price: 229,
    category: "Biryani",
    description: "Flavorful vegetable biryani with aromatic rice",
    image: "/uploads/veg-biryani.jpg",
  },
  {
    name: "White Sauce Pasta",
    price: 279,
    category: "Pasta",
    description: "Creamy white sauce pasta with herbs",
    image: "/uploads/white-sauce-pasta.jpg",
  },
  {
    name: "Chicken Pasta",
    price: 329,
    category: "Pasta",
    description: "Creamy pasta topped with juicy chicken",
    image: "/uploads/chicken-pasta.jpg",
  },
  {
    name: "French Fries",
    price: 149,
    category: "Sides",
    description: "Crispy golden french fries",
    image: "/uploads/French Fries.jpg",
  },
  {
    name: "Garlic Bread",
    price: 169,
    category: "Sides",
    description: "Toasted garlic bread with buttery herbs",
    image: "/uploads/Garlic Bread.jpg",
  },
  {
    name: "Chicken Wings",
    price: 299,
    category: "Sides",
    description: "Crispy and juicy chicken wings",
    image: "/uploads/chicken-wings.jpg",
  },
  {
    name: "Chocolate Milkshake",
    price: 199,
    category: "Drink",
    description: "Rich and creamy chocolate milkshake",
    image: "/uploads/chocolate-milkshake.jpg",
  },
  {
    name: "Mango Milkshake",
    price: 179,
    category: "Drink",
    description: "Fresh and creamy mango milkshake",
    image: "/uploads/mango-milkshake.jpg",
  },
  {
    name: "Coca Cola",
    price: 99,
    category: "Drink",
    description: "Chilled refreshing Coca Cola",
    image: "/uploads/coca-cola.jpg",
  },
  {
    name: "Fresh Lime Soda",
    price: 129,
    category: "Drink",
    description: "Refreshing lime soda with fresh lime and mint",
    image: "/uploads/fresh-lime-soda.jpg",
  },
];

async function seedFoods() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Food.insertMany(foods);

    console.log("All 15 foods added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error);
    process.exit(1);
  }
}

seedFoods();