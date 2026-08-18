import { useEffect, useState } from "react";
import axios from "axios";


function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading orders...</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff8f3",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#5c4033",
          marginBottom: "30px",
        }}
      >
        My Order History
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#765b54" }}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <div style={{ maxWidth: "900px", margin: "auto" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: "#5c4033" }}>
                Order #{order._id.slice(-6)}
              </h3>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Items:</strong>
              </p>

              <ul>
                {order.items?.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;