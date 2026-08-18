import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: "user",
        }
      );

      alert(
        response.data.message ||
          "Account created successfully!"
      );

      navigate("/login");
    } catch (requestError) {
      console.error("Registration error:", requestError);

      setError(
        requestError.response?.data?.message ||
          "Could not create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px",
        background: "#fff8f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow:
            "0 8px 30px rgba(92, 52, 37, 0.12)",
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

        <h1
          style={{
            color: "#2e1712",
            marginTop: "30px",
            marginBottom: "8px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#765b54",
            marginBottom: "25px",
          }}
        >
          Create your customer account to order food.
        </p>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "18px",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#2e1712",
              fontWeight: "bold",
            }}
          >
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              marginBottom: "18px",
              border: "1px solid #ead6ce",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#2e1712",
              fontWeight: "bold",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              marginBottom: "18px",
              border: "1px solid #ead6ce",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#2e1712",
              fontWeight: "bold",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              marginBottom: "22px",
              border: "1px solid #ead6ce",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#ff5a36",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Customer Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#765b54",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#ff5a36",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;