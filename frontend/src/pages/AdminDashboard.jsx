import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Load food images from src/images
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

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function getStatusColor(status) {
  const colors = {
    Pending: { background: "#fff2c7", color: "#9a6700" },
    Confirmed: { background: "#dbeafe", color: "#1d4ed8" },
    Preparing: { background: "#f3e8ff", color: "#7e22ce" },
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

  return colors[status] || colors.Pending;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ADMIN LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders",
          authConfig
        );

        setOrders(response.data);
      } catch (requestError) {
        console.error("Error loading orders:", requestError);

        setError(
          requestError.response?.data?.message ||
            "Could not load orders. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    setUpdatingOrderId(orderId);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        authConfig
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? response.data.order : order
        )
      );
    } catch (requestError) {
      console.error("Error updating order status:", requestError);

      setError(
        requestError.response?.data?.message ||
          "Could not update the order status."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading admin dashboard...
      </h2>
    );
  }

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + Number(order.total),
      0
    );

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const customerName =
      order.userId?.name?.toLowerCase() || "";

    const customerEmail =
      order.userId?.email?.toLowerCase() || "";

    const matchesSearch =
      order._id.toLowerCase().includes(searchText) ||
      String(order.phone)
        .toLowerCase()
        .includes(searchText) ||
      String(order.address)
        .toLowerCase()
        .includes(searchText) ||
      customerName.includes(searchText) ||
      customerEmail.includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
          maxWidth: "1150px",
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
          🍕 Kinetrexa
        </Link>

        {/* ADMIN PANEL + LOGOUT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "10px 15px",
              borderRadius: "30px",
              background: "#2e1712",
              color: "white",
              fontWeight: "bold",
            }}
          >
            👨‍💼 Admin Panel
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "30px",
              background: "#fee2e2",
              color: "#dc2626",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1150px",
          margin: "auto",
        }}
      >
        {/* TITLE */}
        <p
          style={{
            color: "#d94325",
            fontWeight: "bold",
          }}
        >
          BUSINESS OVERVIEW
        </p>

        <h1
          style={{
            color: "#2e1712",
            margin: "8px 0",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#765b54",
            marginBottom: "28px",
          }}
        >
          View and manage all customer orders.
        </p>

        {/* DASHBOARD CARDS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "22px",
              borderRadius: "16px",
              background: "#2e1712",
              color: "white",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#f0c9bc",
              }}
            >
              Total Orders
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "white",
                fontSize: "32px",
              }}
            >
              {orders.length}
            </h2>
          </div>

          <div
            style={{
              padding: "22px",
              borderRadius: "16px",
              background: "#ff5a36",
              color: "white",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#ffe4da",
              }}
            >
              Total Revenue
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "white",
                fontSize: "32px",
              }}
            >
              ₹{totalRevenue}
            </h2>
          </div>

          <div
            style={{
              padding: "22px",
              borderRadius: "16px",
              background: "#2f7d4b",
              color: "white",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#d9f5e1",
              }}
            >
              Delivered Orders
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "white",
                fontSize: "32px",
              }}
            >
              {deliveredOrders}
            </h2>
          </div>

          <div
            style={{
              padding: "22px",
              borderRadius: "16px",
              background: "#7e22ce",
              color: "white",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#eadcff",
              }}
            >
              Pending Orders
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "white",
                fontSize: "32px",
              }}
            >
              {pendingOrders}
            </h2>
          </div>
        </section>

        {/* SEARCH + FILTER */}
        <section
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "18px",
            boxShadow:
              "0 8px 24px rgba(92, 52, 37, 0.08)",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 220px",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Search by customer, order ID, phone or address..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              style={{
                padding: "14px",
                border: "1px solid #ead6ce",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
              }}
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              style={{
                padding: "14px",
                border: "1px solid #ead6ce",
                borderRadius: "10px",
                fontSize: "15px",
                background: "white",
              }}
            >
              <option value="All">
                All Statuses
              </option>

              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <p
            style={{
              padding: "15px",
              background: "#fee2e2",
              borderRadius: "10px",
              color: "#b91c1c",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        {/* ORDERS */}
        {filteredOrders.length === 0 ? (
          <section
            style={{
              padding: "50px",
              textAlign: "center",
              background: "white",
              borderRadius: "18px",
              boxShadow:
                "0 8px 24px rgba(92, 52, 37, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "50px",
              }}
            >
              📦
            </div>

            <h2
              style={{
                color: "#2e1712",
              }}
            >
              No matching orders
            </h2>

            <p
              style={{
                color: "#765b54",
              }}
            >
              Try changing your search or status filter.
            </p>
          </section>
        ) : (
          <section>
            <p
              style={{
                color: "#765b54",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              Showing {filteredOrders.length} order
              {filteredOrders.length !== 1
                ? "s"
                : ""}
            </p>

            {filteredOrders.map((order) => {
              const statusStyle =
                getStatusColor(order.status);

              return (
                <article
                  key={order._id}
                  style={{
                    padding: "25px",
                    marginBottom: "20px",
                    background: "white",
                    borderRadius: "18px",
                    boxShadow:
                      "0 8px 24px rgba(92, 52, 37, 0.1)",
                  }}
                >
                  {/* ORDER HEADER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                      marginBottom: "18px",
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

                      {/* CUSTOMER NAME */}
                      <p
                        style={{
                          margin: "6px 0 0",
                          color: "#2e1712",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        Customer:{" "}
                        {order.userId?.name || "Customer"}
                      </p>

                      {/* CUSTOMER EMAIL */}
                      {order.userId?.email && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "#765b54",
                            fontSize: "14px",
                          }}
                        >
                          Email: {order.userId.email}
                        </p>
                      )}

                      <h2
                        style={{
                          margin: "8px 0 0",
                          color: "#2e1712",
                        }}
                      >
                        Total: ₹{order.total}
                      </h2>
                    </div>

                    <select
                      value={order.status || "Pending"}
                      disabled={
                        updatingOrderId === order._id
                      }
                      onChange={(event) =>
                        updateStatus(
                          order._id,
                          event.target.value
                        )
                      }
                      style={{
                        padding: "11px 14px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                          statusStyle.background,
                        color: statusStyle.color,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ORDER ITEMS */}
                  <div
                    style={{
                      paddingTop: "8px",
                      borderTop: "1px solid #f0ddd5",
                    }}
                  >
                    {order.items.map((item, index) => {
                      const image = getFoodImage(item.name);

                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "15px",
                            padding: "12px 0",
                            borderBottom:
                              "1px solid #f5e8e3",
                          }}
                        >
                          {/* LEFT SIDE */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                            }}
                          >
                            {/* IMAGE */}
                            <div
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                background: "#fff0e8",
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
                                    fontSize: "32px",
                                  }}
                                >
                                  🍕
                                </div>
                              )}
                            </div>

                            {/* NAME */}
                            <div>
                              <strong
                                style={{
                                  color: "#2e1712",
                                  fontSize: "16px",
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
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>

                          {/* PRICE */}
                          <strong
                            style={{
                              color: "#2e1712",
                              whiteSpace: "nowrap",
                            }}
                          >
                            ₹{item.price * item.quantity}
                          </strong>
                        </div>
                      );
                    })}
                  </div>

                  {/* CUSTOMER DETAILS */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "15px",
                      marginTop: "20px",
                      color: "#765b54",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px",
                        background: "#fff8f4",
                        borderRadius: "12px",
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
    </div>
  );
}

export default AdminDashboard;