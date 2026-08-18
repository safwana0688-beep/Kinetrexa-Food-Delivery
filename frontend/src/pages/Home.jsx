import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLink = {
    color: "#3d2420",
    textDecoration: "none",
    fontWeight: "700",
    padding: "8px 10px",
    borderRadius: "8px",
  };

  const primaryButton = {
    display: "inline-block",
    padding: "14px 22px",
    background: "#ff5a36",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    boxShadow: "0 8px 18px rgba(255, 90, 54, 0.25)",
  };

  // BESTSELLER FOODS
  const bestSellers = [
    [
      "🍕",
      "Margherita Pizza",
      "Classic pizza with fresh tomato, cheese and herbs.",
      "₹249",
    ],
    [
      "🍕",
      "Farmhouse Pizza",
      "Loaded with fresh vegetables and delicious toppings.",
      "₹299",
    ],
  ];

  // OPEN MENU AND SELECT FOOD
  const openBestSeller = (foodName) => {
    navigate(`/menu?food=${encodeURIComponent(foodName)}`);
  };

  const features = [
    [
      "🍅",
      "Fresh Ingredients",
      "Quality ingredients and delicious food made with care.",
    ],
    [
      "🛵",
      "Quick Delivery",
      "Get your favorite food delivered hot and fresh.",
    ],
    [
      "📦",
      "Easy Order Tracking",
      "Follow your order from preparation to delivery.",
    ],
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "#3d2420",
        background:
          "radial-gradient(circle at top left, #ffd6bf 0%, transparent 34%), linear-gradient(135deg, #fffaf6 0%, #ffffff 55%, #ffe9dc 100%)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          width: "100%",
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "18px 25px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#ff5a36",
            fontWeight: "900",
            fontSize: "25px",
          }}
        >
          🍕 Kinetrexa
        </Link>

        {/* NAVIGATION */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          <Link to="/" style={navLink}>
            Home
          </Link>

          <Link to="/menu" style={navLink}>
            Menu
          </Link>

          <Link to="/cart" style={navLink}>
            Cart
          </Link>

          {/* UPDATED: MY ORDERS */}
          <Link to="/my-orders" style={navLink}>
            My Orders
          </Link>

          {user && (
            <Link to="/profile" style={navLink}>
              Profile
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" style={navLink}>
              Admin
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              style={{
                ...navLink,
                color: "#ff5a36",
              }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                ...navLink,
                border: "none",
                background: "transparent",
                color: "#d93623",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* HEADER LINE */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#f2ddd4",
        }}
      />

      {/* ================= HERO ================= */}
      <main
        style={{
          width: "100%",
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "55px 25px 60px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "45px",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <section>
          <p
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "30px",
              background: "#ffe0d2",
              color: "#d94325",
              fontWeight: "bold",
              fontSize: "14px",
              margin: "0 0 18px",
            }}
          >
            ✨ Fresh food. Fast delivery.
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 5vw, 68px)",
              lineHeight: "1.04",
              margin: "0 0 20px",
              color: "#2e1712",
            }}
          >
            Your favorite food,
            <br />
            delivered with{" "}
            <span style={{ color: "#ff5a36" }}>joy.</span>
          </h1>

          <p
            style={{
              maxWidth: "540px",
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#6c514a",
              margin: "0 0 25px",
            }}
          >
            Discover delicious meals, add them to your cart, and track every
            order from our kitchen to your doorstep.
          </p>

          {user && (
            <div
              style={{
                display: "inline-block",
                padding: "10px 14px",
                marginBottom: "22px",
                background: "#fff",
                border: "1px solid #f2ddd4",
                borderRadius: "10px",
                color: "#765b54",
              }}
            >
              Welcome back,{" "}
              <strong style={{ color: "#2e1712" }}>{user.name}</strong> 👋
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <Link to="/menu" style={primaryButton}>
              🍕 Explore the Menu
            </Link>

            {/* UPDATED */}
            <Link
              to="/my-orders"
              style={{
                display: "inline-block",
                padding: "14px 18px",
                color: "#3d2420",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Track an order →
            </Link>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "350px",
            borderRadius: "30px",
            padding: "25px",
            boxSizing: "border-box",
            overflow: "hidden",
            background:
              "linear-gradient(145deg, #ff6844 0%, #ff9470 55%, #ffd1bb 100%)",
            boxShadow: "0 20px 40px rgba(184, 70, 38, 0.20)",
          }}
        >
          <div
            style={{
              fontSize: "100px",
              textAlign: "center",
              marginTop: "70px",
              lineHeight: "1.1",
              letterSpacing: "-12px",
            }}
          >
            🍕🍔🍟
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "55px",
              marginTop: "8px",
            }}
          >
            🥤✨
          </div>

          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              background: "#fff",
              color: "#e91e63",
              padding: "8px 14px",
              borderRadius: "18px",
              fontWeight: "bold",
              fontSize: "13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            ⭐ Bestseller
          </div>

          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              padding: "10px 13px",
              borderRadius: "14px",
              background: "#2f7d4b",
              color: "white",
              fontWeight: "bold",
              fontSize: "13px",
              boxShadow: "0 5px 12px rgba(0,0,0,0.12)",
            }}
          >
            ⚡ 30 min delivery
          </div>

          <div
            style={{
              position: "absolute",
              left: "20px",
              bottom: "20px",
              maxWidth: "220px",
              padding: "12px 15px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <strong>🔥 Today's Special</strong>

            <div
              style={{
                color: "#75534a",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              Hot, fresh & made for you
            </div>
          </div>
        </section>
      </main>

      {/* ================= FEATURES ================= */}
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "0 25px 55px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {features.map(([icon, title, text]) => (
            <div
              key={title}
              style={{
                padding: "23px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #f5e4dd",
                boxShadow: "0 8px 22px rgba(74, 45, 35, 0.07)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#fff0e9",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "25px",
                  marginBottom: "13px",
                }}
              >
                {icon}
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: "18px",
                  color: "#2e1712",
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  color: "#765b54",
                  margin: 0,
                  lineHeight: "1.5",
                  fontSize: "14px",
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BESTSELLERS ================= */}
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "10px 25px 60px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              color: "#ff5a36",
              fontWeight: "bold",
              fontSize: "13px",
              letterSpacing: "1px",
              margin: "0 0 8px",
            }}
          >
            CUSTOMER FAVORITES
          </p>

          <h2
            style={{
              fontSize: "34px",
              margin: "0 0 10px",
              color: "#2e1712",
            }}
          >
            Our Bestsellers
          </h2>

          <p
            style={{
              color: "#765b54",
              margin: 0,
            }}
          >
            The dishes our customers love the most.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "22px",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {bestSellers.map(([icon, name, description, price]) => (
            <div
              key={name}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "26px 22px",
                textAlign: "center",
                boxShadow: "0 10px 28px rgba(74, 45, 35, 0.09)",
                border: "1px solid #f4ddd3",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 12px",
                  borderRadius: "50%",
                  background: "#fff3ed",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "55px",
                }}
              >
                {icon}
              </div>

              <span
                style={{
                  display: "inline-block",
                  background: "#fff0e9",
                  color: "#ff5a36",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                ⭐ BESTSELLER
              </span>

              <h3
                style={{
                  margin: "7px 0",
                  color: "#2e1712",
                  fontSize: "20px",
                }}
              >
                {name}
              </h3>

              <p
                style={{
                  color: "#765b54",
                  lineHeight: "1.5",
                  minHeight: "45px",
                  fontSize: "14px",
                }}
              >
                {description}
              </p>

              <strong
                style={{
                  display: "block",
                  color: "#ff5a36",
                  fontSize: "21px",
                  margin: "12px 0 16px",
                }}
              >
                {price}
              </strong>

              <button
                onClick={() => openBestSeller(name)}
                style={{
                  padding: "11px 22px",
                  background: "#ff5a36",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Order Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}
      {user && (
        <section
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
            padding: "0 25px 55px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2e1712, #47251d)",
              color: "white",
              borderRadius: "22px",
              padding: "30px 25px",
              textAlign: "center",
              boxShadow: "0 12px 30px rgba(46, 23, 18, 0.15)",
            }}
          >
            <p
              style={{
                color: "#ff9b7e",
                fontWeight: "bold",
                margin: "0 0 8px",
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              YOUR ACCOUNT
            </p>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "27px",
              }}
            >
              Welcome, {user.name}! 👋
            </h2>

            <p
              style={{
                color: "#f0c9bc",
                margin: "0 0 22px",
              }}
            >
              Manage your account, view orders or start shopping.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {/* UPDATED TRACK ORDER */}
              <Link
                to="/my-orders"
                style={{
                  padding: "11px 18px",
                  background: "#ff5a36",
                  color: "white",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Track an order →
              </Link>

              <Link
                to="/profile"
                style={{
                  padding: "11px 18px",
                  background: "#ff5a36",
                  color: "white",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                My Profile
              </Link>

              <Link
                to="/cart"
                style={{
                  padding: "11px 18px",
                  background: "white",
                  color: "#2e1712",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                My Cart
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          padding: "25px 20px",
          textAlign: "center",
          color: "#765b54",
          fontSize: "14px",
          borderTop: "1px solid #f2ddd4",
          background: "rgba(255,255,255,0.55)",
        }}
      >
        <strong style={{ color: "#3d2420" }}>🍕 Kinetrexa</strong>

        <div style={{ marginTop: "6px" }}>
          © 2026 Kinetrexa Food Delivery • Fresh food, fast delivery
        </div>
      </footer>

      {/* ================= RESPONSIVE ================= */}
      <style>
        {`
          @media (max-width: 800px) {
            header {
              justify-content: center !important;
              text-align: center;
            }

            nav {
              justify-content: center !important;
            }

            main {
              grid-template-columns: 1fr !important;
              padding-top: 35px !important;
            }

            main > section:first-child {
              text-align: center;
            }

            main > section:first-child > p {
              margin-left: auto !important;
              margin-right: auto !important;
            }

            main > section:first-child > div {
              justify-content: center !important;
            }

            main > section:nth-child(2) {
              min-height: 310px !important;
            }

            section {
              max-width: 100%;
            }
          }

          @media (max-width: 650px) {
            main {
              padding-left: 18px !important;
              padding-right: 18px !important;
            }

            main > section:nth-child(2) {
              min-height: 280px !important;
            }

            main > section:nth-child(2) > div:first-child {
              font-size: 75px !important;
              margin-top: 70px !important;
            }

            main > section:nth-child(2) > div:nth-child(2) {
              font-size: 42px !important;
            }
          }

          @media (max-width: 500px) {
            header {
              padding: 16px 12px !important;
            }

            header nav a,
            header nav button {
              font-size: 13px !important;
              padding: 6px !important;
            }

            main {
              padding-top: 30px !important;
            }

            h1 {
              font-size: 42px !important;
            }

            main > section:nth-child(2) {
              min-height: 250px !important;
              padding: 18px !important;
            }

            main > section:nth-child(2) > div:first-child {
              font-size: 62px !important;
              margin-top: 65px !important;
            }

            main > section:nth-child(2) > div:nth-child(2) {
              font-size: 35px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;