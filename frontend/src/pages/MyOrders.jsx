import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Load food images
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

// Status colors
function getStatusStyle(status) {
  const styles = {
    Pending: {
      background: "#fff2c7",
      color: "#9a6700",
    },
    Confirmed: {
      background: "#dbeafe",
      color: "#1d4ed8",
    },
    Preparing: {
      background: "#f3e8ff",
      color: "#7e22ce",
    },
    "Out for Delivery": {
      background: "#e0f2fe",
      color: "#0369a1",
    },
    Delivered: {
      background: "#dcfce7",
      color: "#15803d",
    },
    Cancelled: {
      background: "#fee2e2",
      color: "#dc2626",
    },
  };

  return styles[status] || styles.Pending;
}

// Order progress
const orderSteps = [
  {
    name: "Pending",
    icon: "🕐",
  },
  {
    name: "Confirmed",
    icon: "✓",
  },
  {
    name: "Preparing",
    icon: "👨‍🍳",
  },
  {
    name: "Out for Delivery",
    icon: "🛵",
  },
  {
    name: "Delivered",
    icon: "✓",
  },
];

function getStepIndex(status) {
  return orderSteps.findIndex(
    (step) => step.name === status
  );
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Load orders
  const loadMyOrders = async () => {
    try {
      setRefreshing(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/orders/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
      setError("");
    } catch (requestError) {
      console.error(
        "Error loading my orders:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Could not load your orders."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load orders when page opens
  useEffect(() => {
    loadMyOrders();
  }, []);

  // Loading
  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "#2e1712",
        }}
      >
        Loading your orders...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "25px",
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
            fontSize: "24px",
            fontWeight: "900",
          }}
        >
          Kinetrexa Home
        </Link>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              background: "#fff",
              color: "#2e1712",
              padding: "11px 18px",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "1px solid #ead8d0",
            }}
          >
            Profile
          </Link>

          <Link
            to="/menu"
            style={{
              textDecoration: "none",
              background: "#2e1712",
              color: "white",
              padding: "11px 18px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            Back to Menu
          </Link>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1050px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <p
            style={{
              color: "#d94325",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            YOUR ORDERS
          </p>

          <h1
            style={{
              margin: "8px 0",
              color: "#2e1712",
              fontSize: "40px",
            }}
          >
            My Orders
          </h1>

          <p
            style={{
              color: "#765b54",
              fontSize: "17px",
            }}
          >
            Track your food orders and delivery status.
          </p>

          {/* REFRESH BUTTON */}
          <button
            onClick={loadMyOrders}
            disabled={refreshing}
            style={{
              marginTop: "15px",
              background: "#ff5a36",
              color: "white",
              border: "none",
              padding: "11px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: refreshing
                ? "not-allowed"
                : "pointer",
              opacity: refreshing ? 0.7 : 1,
            }}
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh Order Status"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              padding: "16px",
              marginBottom: "20px",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        {/* NO ORDERS */}
        {orders.length === 0 ? (
          <section
            style={{
              background: "white",
              padding: "60px 25px",
              textAlign: "center",
              borderRadius: "18px",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "15px",
              }}
            >
              📦
            </div>

            <h2 style={{ color: "#2e1712" }}>
              No orders yet
            </h2>

            <p
              style={{
                color: "#765b54",
                marginBottom: "25px",
              }}
            >
              You haven't placed any orders yet.
            </p>

            <Link
              to="/menu"
              style={{
                display: "inline-block",
                background: "#ff5a36",
                color: "white",
                textDecoration: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Explore Menu
            </Link>
          </section>
        ) : (
          <section>
            {orders.map((order) => {
              const status = order.status || "Pending";
              const statusStyle = getStatusStyle(status);
              const currentStep = getStepIndex(status);

              return (
                <article
                  key={order._id}
                  style={{
                    background: "white",
                    borderRadius: "18px",
                    padding: "25px",
                    marginBottom: "22px",
                    boxShadow:
                      "0 8px 24px rgba(92, 52, 37, 0.1)",
                  }}
                >
                  {/* ORDER HEADER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                      paddingBottom: "18px",
                      borderBottom:
                        "1px solid #f0ddd5",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          color: "#765b54",
                          fontSize: "14px",
                        }}
                      >
                        Order #{order._id.slice(-6)}
                      </p>

                      <h2
                        style={{
                          margin: "6px 0 0",
                          color: "#2e1712",
                        }}
                      >
                        ₹{order.total}
                      </h2>
                    </div>

                    {/* CURRENT STATUS */}
                    <span
                      style={{
                        padding: "10px 15px",
                        borderRadius: "25px",
                        background:
                          statusStyle.background,
                        color: statusStyle.color,
                        fontWeight: "bold",
                      }}
                    >
                      {status}
                    </span>
                  </div>

                  {/* ORDER TRACKER */}
                  <div
                    style={{
                      marginTop: "28px",
                      padding: "20px",
                      background: "#fff8f4",
                      borderRadius: "16px",
                    }}
                  >
                    <h3
                      style={{
                        color: "#2e1712",
                        marginTop: 0,
                        marginBottom: "25px",
                      }}
                    >
                      Order Progress
                    </h3>

                    {status === "Cancelled" ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "18px",
                          background: "#fee2e2",
                          borderRadius: "12px",
                          color: "#dc2626",
                          fontWeight: "bold",
                        }}
                      >
                        ❌ This order has been cancelled.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          position: "relative",
                          gap: "5px",
                        }}
                      >
                        {/* CONNECTING LINE */}
                        <div
                          style={{
                            position: "absolute",
                            top: "18px",
                            left: "10%",
                            right: "10%",
                            height: "4px",
                            background: "#ead8d0",
                            zIndex: 0,
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "18px",
                            left: "10%",
                            width:
                              currentStep <= 0
                                ? "0%"
                                : `${(currentStep / 4) * 80}%`,
                            height: "4px",
                            background: "#ff5a36",
                            zIndex: 1,
                            transition:
                              "width 0.5s ease",
                          }}
                        />

                        {orderSteps.map(
                          (step, index) => {
                            const completed =
                              index <= currentStep;

                            const active =
                              index === currentStep;

                            return (
                              <div
                                key={step.name}
                                style={{
                                  flex: 1,
                                  textAlign: "center",
                                  position: "relative",
                                  zIndex: 2,
                                }}
                              >
                                <div
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    margin: "0 auto 9px",
                                    borderRadius: "50%",
                                    display: "grid",
                                    placeItems: "center",
                                    background:
                                      completed
                                        ? "#ff5a36"
                                        : "#ead8d0",
                                    color: completed
                                      ? "white"
                                      : "#765b54",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    border: active
                                      ? "4px solid #ffd5c8"
                                      : "none",
                                    boxSizing:
                                      "border-box",
                                  }}
                                >
                                  {step.icon}
                                </div>

                                <div
                                  style={{
                                    fontSize: "12px",
                                    fontWeight:
                                      completed
                                        ? "bold"
                                        : "normal",
                                    color: completed
                                      ? "#2e1712"
                                      : "#9b8178",
                                  }}
                                >
                                  {step.name}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* ORDER ITEMS */}
                  <div
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    <h3
                      style={{
                        color: "#2e1712",
                        marginBottom: "12px",
                      }}
                    >
                      Ordered Items
                    </h3>

                    {order.items.map(
                      (item, index) => {
                        const image =
                          getFoodImage(item.name);

                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "space-between",
                              gap: "15px",
                              padding: "12px 0",
                              borderBottom:
                                "1px solid #f5e8e3",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                              }}
                            >
                              {/* FOOD IMAGE */}
                              <div
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  background:
                                    "#fff0e8",
                                  flexShrink: 0,
                                }}
                              >
                                {image ? (
                                  <img
                                    src={image}
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
                                      fontSize: "30px",
                                    }}
                                  >
                                    🍕
                                  </div>
                                )}
                              </div>

                              <div>
                                <strong
                                  style={{
                                    color: "#2e1712",
                                  }}
                                >
                                  {item.name}
                                </strong>

                                <p
                                  style={{
                                    margin: "5px 0 0",
                                    color: "#765b54",
                                    fontSize: "14px",
                                  }}
                                >
                                  Quantity:{" "}
                                  {item.quantity}
                                </p>
                              </div>
                            </div>

                            <strong
                              style={{
                                color: "#2e1712",
                                whiteSpace: "nowrap",
                              }}
                            >
                              ₹
                              {item.price *
                                item.quantity}
                            </strong>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* DELIVERY DETAILS */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "15px",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px",
                        background: "#fff8f4",
                        borderRadius: "12px",
                        color: "#765b54",
                      }}
                    >
                      <strong
                        style={{
                          color: "#2e1712",
                        }}
                      >
                        Delivery Address
                      </strong>

                      <br />

                      {order.address}
                    </div>

                    <div
                      style={{
                        padding: "15px",
                        background: "#fff8f4",
                        borderRadius: "12px",
                        color: "#765b54",
                      }}
                    >
                      <strong
                        style={{
                          color: "#2e1712",
                        }}
                      >
                        Phone
                      </strong>

                      <br />

                      {order.phone}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {/* MOBILE STYLES */}
      <style>
        {`
          @media (max-width: 650px) {
            main {
              width: 100%;
            }

            article {
              padding: 18px !important;
            }

            h1 {
              font-size: 32px !important;
            }

            /* Make tracker scroll horizontally on small screens */
            article > div:nth-child(2) {
              overflow-x: auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default MyOrders;