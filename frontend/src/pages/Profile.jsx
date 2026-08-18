import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(savedUser);
    setUser(currentUser);

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrderCount(response.data.length);
      } catch (error) {
        console.error("Could not load orders:", error);
      }
    };

    loadOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "#2e1712",
        }}
      >
        Loading profile...
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

        <Link
          to="/"
          style={{
            textDecoration: "none",
            background: "#2e1712",
            color: "white",
            padding: "11px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Home
        </Link>
      </header>

      <main
        style={{
          maxWidth: "700px",
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
            }}
          >
            MY ACCOUNT
          </p>

          <h1
            style={{
              color: "#2e1712",
              fontSize: "40px",
              margin: "8px 0",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              color: "#765b54",
              fontSize: "17px",
            }}
          >
            View your account information and orders.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 8px 24px rgba(92, 52, 37, 0.1)",
          }}
        >
          {/* PROFILE ICON */}
          <div
            style={{
              width: "90px",
              height: "90px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#ffe0d2",
              display: "grid",
              placeItems: "center",
              fontSize: "45px",
            }}
          >
            👤
          </div>

          <h2
            style={{
              textAlign: "center",
              color: "#2e1712",
              marginBottom: "30px",
            }}
          >
            {user.name}
          </h2>

          {/* DETAILS */}
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            <div
              style={{
                padding: "17px",
                background: "#fff8f4",
                borderRadius: "12px",
              }}
            >
              <strong style={{ color: "#2e1712" }}>
                Name
              </strong>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#765b54",
                }}
              >
                {user.name}
              </p>
            </div>

            <div
              style={{
                padding: "17px",
                background: "#fff8f4",
                borderRadius: "12px",
              }}
            >
              <strong style={{ color: "#2e1712" }}>
                Email
              </strong>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#765b54",
                }}
              >
                {user.email}
              </p>
            </div>

            <div
              style={{
                padding: "17px",
                background: "#fff8f4",
                borderRadius: "12px",
              }}
            >
              <strong style={{ color: "#2e1712" }}>
                Account Type
              </strong>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#765b54",
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </p>
            </div>

            <div
              style={{
                padding: "17px",
                background: "#fff8f4",
                borderRadius: "12px",
              }}
            >
              <strong style={{ color: "#2e1712" }}>
                Total Orders
              </strong>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#765b54",
                }}
              >
                {orderCount} order(s)
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            {/* UPDATED: /orders → /my-orders */}
            <Link
              to="/my-orders"
              style={{
                textAlign: "center",
                padding: "13px",
                background: "#ff5a36",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              View My Orders
            </Link>

            <Link
              to="/menu"
              style={{
                textAlign: "center",
                padding: "13px",
                background: "#2f7d4b",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Order Food
            </Link>
          </div>

          {/* ADMIN BUTTON */}
          {user.role === "admin" && (
            <Link
              to="/admin"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "12px",
                padding: "13px",
                background: "#2e1712",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Open Admin Dashboard
            </Link>
          )}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "13px",
              border: "1px solid #f0c9bc",
              background: "#fff",
              color: "#d93623",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </section>
      </main>
    </div>
  );
}

export default Profile;