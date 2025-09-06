import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Style untuk container, button, dan form
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
  backgroundColor: "#282c34",
  color: "white",
  fontFamily: "sans-serif",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#3a3f47",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1em",
  borderRadius: "5px",
  border: "1px solid #61dafb",
  backgroundColor: "#4f555d",
  color: "white",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1.2em",
  marginTop: "10px",
  backgroundColor: "#61dafb",
  color: "#282c34",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
};

const linkStyle = {
  color: "#61dafb",
  textDecoration: "none",
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login berhasil!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal. Periksa kembali email dan password Anda.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Belum punya akun? <Link to="/register" style={linkStyle}>Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;