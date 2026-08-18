import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const token = localStorage.getItem("token");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!token) {
      alert("Please log in before placing an order.");
      navigate("/login");
      return;
    }

    if (!address.trim() || !phone.trim()) {
      alert(
        "Please enter your delivery address and phone number."
      );
      return;
    }

    if (phone.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        items: cart.map((item) => ({
          foodId: item._id || item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
        })),

        address: address.trim(),
        phone: phone.trim(),
        total: total,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order placed:", response.data);

      localStorage.removeItem("cart");

      alert("🎉 Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fff8f4",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "white",
            padding: "50px 25px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow:
              "0 8px 25px rgba(92, 52, 37, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "65px",
              marginBottom: "10px",
            }}
          >
            🛒
          </div>

          <h1 style={{ color: "#2e1712" }}>
            Your cart is empty
          </h1>

          <p style={{ color: "#765b54" }}>
            Add some delicious food before checking out.
          </p>

          <Link
            to="/menu"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "13px 25px",
              backgroundColor: "#ff5a36",
              color: "white",
              textDecoration: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            🍕 Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff8f4",
        padding: "clamp(15px, 4vw, 30px)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          maxWidth: "1000px",
          margin: "0 auto 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#ff5a36",
            textDecoration: "none",
            fontSize: "clamp(21px, 5vw, 24px)",
            fontWeight: "900",
          }}
        >
          🍕 Kinetrexa
        </Link>

        <Link
          to="/cart"
          style={{
            color: "#3d2420",
            textDecoration: "none",
            fontWeight: "bold",
            padding: "10px 14px",
            background: "white",
            borderRadius: "10px",
            border: "1px solid #ead8d0",
          }}
        >
          ← Back to Cart
        </Link>
      </header>

      <main
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#d94325",
              fontWeight: "bold",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            COMPLETE YOUR ORDER
          </p>

          <h1
            style={{
              color: "#2e1712",
              margin: "0 0 8px",
              fontSize: "clamp(30px, 7vw, 40px)",
            }}
          >
            💳 Checkout
          </h1>

          <p
            style={{
              color: "#765b54",
              margin: 0,
            }}
          >
            Complete your details and place your order.
          </p>
        </div>

        {/* CONTENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "25px",
            alignItems: "start",
          }}
        >
          {/* ORDER SUMMARY */}
          <section
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "clamp(18px, 4vw, 25px)",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#2e1712",
              }}
            >
              🛒 Order Summary
            </h2>

            <p
              style={{
                color: "#765b54",
                marginBottom: "20px",
              }}
            >
              {totalItems} item(s) in your order
            </p>

            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#ffe1d3",
                    flexShrink: 0,
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
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
                        fontSize: "30px",
                      }}
                    >
                      🍕
                    </div>
                  )}
                </div>

                {/* FOOD INFO */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <strong
                    style={{
                      color: "#2e1712",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name}
                  </strong>

                  <div
                    style={{
                      color: "#765b54",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                  >
                    ₹{item.price} ×{" "}
                    {item.quantity}
                  </div>
                </div>

                <strong
                  style={{
                    color: "#ff5a36",
                    whiteSpace: "nowrap",
                  }}
                >
                  ₹
                  {Number(item.price) *
                    Number(item.quantity || 1)}
                </strong>
              </div>
            ))}

            {/* TOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
                marginTop: "22px",
                fontSize: "22px",
                color: "#2e1712",
              }}
            >
              <strong>Total</strong>

              <strong>₹{total}</strong>
            </div>
          </section>

          {/* DELIVERY DETAILS */}
          <section
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "clamp(18px, 4vw, 25px)",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#2e1712",
              }}
            >
              📍 Delivery Details
            </h2>

            {/* ADDRESS */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#3d2420",
              }}
            >
              Delivery Address
            </label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter your full delivery address"
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxSizing: "border-box",
                resize: "vertical",
                fontFamily: "Arial, sans-serif",
                fontSize: "15px",
                outline: "none",
              }}
            />

            {/* PHONE */}
            <label
              style={{
                display: "block",
                marginTop: "20px",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#3d2420",
              }}
            >
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter your phone number"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxSizing: "border-box",
                fontSize: "15px",
                outline: "none",
              }}
            />

            {/* PLACE ORDER */}
            <button
              onClick={placeOrder}
              disabled={placingOrder}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: placingOrder
                  ? "#aaa"
                  : "#ff5a36",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: placingOrder
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {placingOrder
                ? "Placing Order..."
                : "✅ Place Order"}
            </button>

            <Link
              to="/cart"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "20px",
                color: "#765b54",
                textDecoration: "none",
              }}
            >
              ← Back to Cart
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Checkout;