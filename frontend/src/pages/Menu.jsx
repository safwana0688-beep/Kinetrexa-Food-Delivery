import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Deployed backend URL
const API_URL =
  "https://kinetrexa-food-delivery-ngmjyl7bz-safwana0688-beeps-projects.vercel.app";

// Load all images from src/images
const foodImages = import.meta.glob(
  "../images/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  }
);

// Find image by food name
const getFoodImage = (foodName) => {
  const cleanName = foodName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const image = Object.entries(foodImages).find(([path]) => {
    const fileName = path
      .split("/")
      .pop()
      .split(".")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    return fileName === cleanName;
  });

  return image ? image[1] : null;
};

function Menu() {
  const location = useLocation();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Load foods and cart
  useEffect(() => {
    axios
      .get(`${API_URL}/api/foods`)
      .then((response) => {
        setFoods(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading food:", error);
        setLoading(false);
      });

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart")
      );

      setCart(savedCart || []);
    } catch {
      setCart([]);
    }
  }, []);

  // If a Best Seller is clicked, scroll to that food
  useEffect(() => {
    if (foods.length === 0) return;

    const params = new URLSearchParams(location.search);
    const selectedFood = params.get("food");

    if (!selectedFood) return;

    const cleanSelectedFood = selectedFood
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const foodElement = document.getElementById(
      `food-${cleanSelectedFood}`
    );

    if (foodElement) {
      setTimeout(() => {
        foodElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        foodElement.style.transform = "scale(1.03)";
        foodElement.style.boxShadow =
          "0 0 0 4px #ff5a36, 0 12px 30px rgba(92, 52, 37, 0.2)";

        setTimeout(() => {
          foodElement.style.transform = "scale(1)";
          foodElement.style.boxShadow =
            "0 8px 24px rgba(92, 52, 37, 0.1)";
        }, 2000);
      }, 300);
    }
  }, [foods, location.search]);

  // Add food to cart
  const addToCart = (food) => {
    const existingItem = cart.find(
      (item) => item._id === food._id
    );

    const foodImage = food.image
      ? `${API_URL}${food.image}`
      : getFoodImage(food.name);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item._id === food._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                image: item.image || foodImage,
              }
            : item
        )
      : [
          ...cart,
          {
            ...food,
            image: foodImage,
            quantity: 1,
          },
        ];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${food.name} added to cart!`);
  };

  // Total items in cart
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Get categories from food data
  const categories = [
    "All",
    ...new Set(
      foods
        .map((food) => food.category)
        .filter(Boolean)
    ),
  ];

  // Filter foods by search and category
  const filteredFoods = foods.filter((food) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      food.name?.toLowerCase().includes(searchText) ||
      food.description
        ?.toLowerCase()
        .includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Loading screen
  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "#2e1712",
        }}
      >
        Loading delicious food...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "clamp(15px, 3vw, 25px)",
        fontFamily: "Arial, sans-serif",
        background: "#fff8f4",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          maxWidth: "1150px",
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#ff5a36",
            textDecoration: "none",
            fontSize: "clamp(21px, 4vw, 24px)",
            fontWeight: "900",
          }}
        >
          🍕 Kinetrexa
        </Link>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              background: "#fff",
              color: "#2e1712",
              padding: "11px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "1px solid #ead8d0",
            }}
          >
            Home
          </Link>

          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              background: "#2f7d4b",
              color: "white",
              padding: "11px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          maxWidth: "1150px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            padding: "0 5px",
          }}
        >
          <p
            style={{
              color: "#d94325",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            MADE FRESH FOR YOU
          </p>

          <h1
            style={{
              margin: "8px 0",
              fontSize: "clamp(30px, 7vw, 42px)",
              color: "#2e1712",
              lineHeight: "1.15",
            }}
          >
            Discover our menu
          </h1>

          <p
            style={{
              color: "#765b54",
              fontSize: "clamp(15px, 3vw, 18px)",
              lineHeight: "1.5",
              margin: "10px auto 0",
              maxWidth: "600px",
            }}
          >
            Pick your favorite and we'll bring it to your
            doorstep.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto 25px",
          }}
        >
          <input
            type="text"
            placeholder="🔎 Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px 18px",
              borderRadius: "12px",
              border: "1px solid #ead8d0",
              outline: "none",
              fontSize: "16px",
              background: "white",
              color: "#2e1712",
              boxShadow:
                "0 5px 15px rgba(92, 52, 37, 0.06)",
            }}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "35px",
          }}
        >
          {categories.map((category) => {
            const active =
              selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                style={{
                  border: active
                    ? "1px solid #ff5a36"
                    : "1px solid #ead8d0",
                  padding: "10px 17px",
                  borderRadius: "25px",
                  background: active
                    ? "#ff5a36"
                    : "white",
                  color: active
                    ? "white"
                    : "#2e1712",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* FOOD LIST */}
        {foods.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#765b54",
            }}
          >
            No food items available yet.
          </p>
        ) : filteredFoods.length === 0 ? (
          <section
            style={{
              background: "white",
              padding: "50px 20px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "55px",
                marginBottom: "12px",
              }}
            >
              🔎
            </div>

            <h2
              style={{
                color: "#2e1712",
                marginBottom: "8px",
              }}
            >
              No food found
            </h2>

            <p
              style={{
                color: "#765b54",
                marginBottom: "20px",
              }}
            >
              Try another food name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              style={{
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                background: "#ff5a36",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Show All Foods
            </button>
          </section>
        ) : (
          <>
            <p
              style={{
                color: "#765b54",
                marginBottom: "18px",
                fontWeight: "bold",
              }}
            >
              Showing {filteredFoods.length} food item
              {filteredFoods.length !== 1 ? "s" : ""}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                gap: "20px",
              }}
            >
              {filteredFoods.map((food) => {
                const image = food.image
                  ? `${API_URL}${food.image}`
                  : getFoodImage(food.name);

                const foodId = `food-${food.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "")}`;

                return (
                  <article
                    id={foodId}
                    key={food._id}
                    style={{
                      overflow: "hidden",
                      background: "white",
                      borderRadius: "18px",
                      boxShadow:
                        "0 8px 24px rgba(92, 52, 37, 0.1)",
                      transition:
                        "transform 0.3s ease, box-shadow 0.3s ease",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        height:
                          "clamp(180px, 35vw, 210px)",
                        background:
                          "linear-gradient(135deg, #ffd0bd, #fff0e8)",
                        overflow: "hidden",
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={food.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "70px",
                          }}
                        >
                          {food.category
                            ?.toLowerCase()
                            .includes("drink")
                            ? "🥤"
                            : "🍕"}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        padding: "20px",
                      }}
                    >
                      {food.category && (
                        <span
                          style={{
                            display: "inline-block",
                            background: "#fff0e8",
                            color: "#d94325",
                            padding: "5px 9px",
                            borderRadius: "15px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginBottom: "9px",
                          }}
                        >
                          {food.category}
                        </span>
                      )}

                      <h2
                        style={{
                          color: "#2e1712",
                          margin: "0 0 10px",
                          fontSize: "22px",
                        }}
                      >
                        {food.name}
                      </h2>

                      <p
                        style={{
                          minHeight: "48px",
                          color: "#765b54",
                          lineHeight: "1.5",
                          margin: "0",
                          fontSize: "15px",
                        }}
                      >
                        {food.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          gap: "12px",
                          marginTop: "20px",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: "21px",
                            color: "#ff5a36",
                          }}
                        >
                          ₹{food.price}
                        </strong>

                        <button
                          onClick={() => addToCart(food)}
                          style={{
                            border: "none",
                            padding: "11px 16px",
                            borderRadius: "9px",
                            background: "#ff5a36",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            minWidth: "75px",
                          }}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Menu;
