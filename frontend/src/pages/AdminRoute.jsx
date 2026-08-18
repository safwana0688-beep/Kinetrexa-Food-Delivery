import { Link, Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Access denied</h1>
        <p>Only an admin can open this page.</p>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  return children;
}

export default AdminRoute;