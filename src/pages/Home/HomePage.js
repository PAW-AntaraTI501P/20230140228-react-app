// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // sekalian hapus token
    setUser(null);
    navigate("/login");
  };

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

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>

      <Link to="/todos" style={buttonStyle}>
        Lihat Daftar Todo
      </Link>

      {user ? (
        <>
          <p style={{ marginTop: "10px" }}>Selamat Datang, {user.name}!</p>
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={buttonStyle}>
            Login
          </Link>
          <Link to="/register" style={buttonStyle}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
