import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful!");

      setTimeout(() => {
        navigate(response.data.user.role === "admin" ? "/admin" : "/");
      }, 700);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "25px",
        fontFamily: "Arial, sans-serif",
        background:
          "radial-gradient(circle at top left, #ffd6bf 0%, transparent 35%), #fff8f4",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "38px",
          borderRadius: "20px",
          background: "white",
          boxShadow: "0 15px 35px rgba(92, 52, 37, 0.15)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "28px",
            color: "#ff5a36",
            textDecoration: "none",
            fontWeight: "900",
            fontSize: "22px",
          }}
        >
          🍕 Kinetrexa
        </Link>

        <p style={{ color: "#d94325", fontWeight: "bold", margin: 0 }}>
          WELCOME BACK
        </p>

        <h1 style={{ margin: "10px 0", color: "#2e1712" }}>
          Login to your account
        </h1>

        <p style={{ color: "#765b54", marginBottom: "25px" }}>
          Order food and track every delivery in one place.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#3d2420",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              marginBottom: "18px",
              border: "1px solid #e3c6bb",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
              color: "#3d2420",
            }}
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              border: "1px solid #e3c6bb",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#ff5a36",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login →
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px",
              background: message.includes("successful") ? "#dcfce7" : "#fff3e8",
              color: message.includes("successful") ? "#15803d" : "#b45309",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "25px", color: "#765b54" }}>
          New here?{" "}
          <Link to="/register" style={{ color: "#ff5a36", fontWeight: "bold" }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;