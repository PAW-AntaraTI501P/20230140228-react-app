import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Deklarasi variabel style yang sudah kamu buat
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

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/auth/register", form);
      alert("Registrasi berhasil, silakan login!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registrasi gagal, coba lagi.");
    }
  };

  return (
    // Gunakan variabel style di sini
    <div style={containerStyle}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={{ color: "white" }}>Nama:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={{ color: "white" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={{ color: "white" }}>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Sudah punya akun? <Link to="/login" style={linkStyle}>Login</Link>
      </p>
    </div>
  );
}