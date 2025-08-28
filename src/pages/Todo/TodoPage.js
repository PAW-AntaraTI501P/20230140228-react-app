// src/pages/TodoPage.js

import React, { useState, useEffect } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null); // state untuk todo yg sedang diedit

  const fetchTodos = () => {
    fetch("/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (task) => {
  if (editTodo) {
    // mode edit
    fetch(`/api/todos/${editTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        // kalau API ga balikin todo, pakai task dari input
        setTodos(
          todos.map((todo) =>
            todo.id === editTodo.id
              ? { ...todo, task: data.task || task }
              : todo
          )
        );
        setEditTodo(null);
      })
      .catch((err) => console.error("Error updating todo:", err));
  } else {
    // mode tambah
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([
          ...todos,
          { id: data.id, task: data.task || task, completed: false },
        ]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  }
};


  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo); // simpan todo yang mau diedit
  };

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>
        <TodoForm
          onAddTodo={handleAddTodo}
          editTodo={editTodo} // kirim todo yg sedang diedit
        />
        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo} // tombol edit
        />
      </header>
    </div>
  );
};

export default TodoPage;
