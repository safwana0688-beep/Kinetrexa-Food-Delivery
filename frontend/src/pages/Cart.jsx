import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getStoredCart());
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCart = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + change,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    saveCart(
      cart.filter((item) => item._id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "clamp(15px, 4vw, 25px)",
        fontFamily: "Arial, sans-serif",
        background: "#fff8f4",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          maxWidth: "1050px",
          margin: "0 auto 35px",
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
          to="/menu"
          style={{
            textDecoration: "none",
            color: "#3d2420",
            fontWeight: "bold",
            padding: "10px 14px",
            borderRadius: "10px",
            background: "white",
            border: "1px solid #ead8d0",
          }}
        >
          ← Continue shopping
        </Link>
      </header>

      <main
        style={{
          maxWidth: "1050px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              color: "#2e1712",
              margin: "0 0 8px",
              fontSize: "clamp(30px, 7vw, 40px)",
            }}
          >
            🛒 Your Cart
          </h1>

          <p
            style={{
              color: "#765b54",
              margin: 0,
              fontSize: "16px",
            }}
          >
            Review your delicious choices before checkout.
          </p>
        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <section
            style={{
              padding: "55px 20px",
              textAlign: "center",
              background: "white",
              borderRadius: "18px",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "10px",
              }}
            >
              🛒
            </div>

            <h2
              style={{
                color: "#2e1712",
              }}
            >
              Your cart is empty
            </h2>

            <p
              style={{
                color: "#765b54",
                marginBottom: "25px",
              }}
            >
              Add something delicious from our menu.
            </p>

            <Link
              to="/menu"
              style={{
                display: "inline-block",
                padding: "13px 20px",
                borderRadius: "10px",
                background: "#ff5a36",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Explore Menu
            </Link>
          </section>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "25px",
              alignItems: "start",
            }}
          >
            {/* CART ITEMS */}
            <section>
              {cart.map((item) => (
                <article
                  key={item._id}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    alignItems: "center",
                    padding: "18px",
                    marginBottom: "15px",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow:
                      "0 7px 20px rgba(92, 52, 37, 0.08)",
                  }}
                >
                  {/* FOOD IMAGE */}
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "14px",
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
                          width: "100%",
                          height: "100%",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "40px",
                        }}
                      >
                        🍕
                      </div>
                    )}
                  </div>

                  {/* FOOD DETAILS */}
                  <div
                    style={{
                      flex: "1 1 150px",
                      minWidth: 0,
                    }}
                  >
                    <h2
                      style={{
                        margin: "0 0 8px",
                        fontSize: "20px",
                        color: "#2e1712",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.name}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#765b54",
                      }}
                    >
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* QUANTITY + REMOVE */}
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      maxWidth: "160px",
                      marginLeft: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateCart(item._id, -1)
                        }
                        style={{
                          width: "34px",
                          height: "34px",
                          border: "none",
                          borderRadius: "50%",
                          background: "#ffe1d3",
                          color: "#d94325",
                          fontSize: "20px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        −
                      </button>

                      <strong
                        style={{
                          minWidth: "25px",
                          color: "#2e1712",
                        }}
                      >
                        {item.quantity}
                      </strong>

                      <button
                        onClick={() =>
                          updateCart(item._id, 1)
                        }
                        style={{
                          width: "34px",
                          height: "34px",
                          border: "none",
                          borderRadius: "50%",
                          background: "#ff5a36",
                          color: "white",
                          fontSize: "20px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      style={{
                        border: "none",
                        background: "none",
                        color: "#d93623",
                        fontWeight: "bold",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "12px",
                      borderTop: "1px solid #f5e8e3",
                      textAlign: "right",
                      color: "#2e1712",
                      fontWeight: "bold",
                    }}
                  >
                    Item total: ₹
                    {Number(item.price) *
                      item.quantity}
                  </div>
                </article>
              ))}
            </section>

            {/* ORDER SUMMARY */}
            <aside
              style={{
                padding: "25px",
                background: "#2e1712",
                color: "white",
                borderRadius: "18px",
                boxShadow:
                  "0 10px 25px rgba(46, 23, 18, 0.2)",
                position: "sticky",
                top: "20px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: "white",
                }}
              >
                Order Summary
              </h2>

              <p
                style={{
                  color: "#f0c9bc",
                }}
              >
                {totalItems} item(s) in your cart
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop:
                    "1px solid #704b42",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                  margin: "20px 0",
                  fontSize: "22px",
                }}
              >
                <strong>Total</strong>

                <strong>₹{total}</strong>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                style={{
                  width: "100%",
                  border: "none",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#ff5a36",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Proceed to Checkout →
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;