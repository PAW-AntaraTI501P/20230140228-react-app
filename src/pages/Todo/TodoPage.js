import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 🟢 untuk modal

  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    if (editTodo) {
      // mode edit
      fetch(`/api/todos/${editTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(
            todos.map((todo) =>
              todo.id === editTodo.id ? { ...todo, task: data.task || task } : todo
            )
          );
          setEditTodo(null);
          setIsModalOpen(false); // tutup modal
        })
        .catch((err) => console.error("Error updating todo:", err));
    } else {
      // mode tambah
      fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, { id: data.id, task: data.task || task, completed: false }]);
          setIsModalOpen(false); // tutup modal
        })
        .catch((err) => console.error("Error adding todo:", err));
    }
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
    setEditTodo(todo);
    setIsModalOpen(true); // 🟢 buka modal langsung kalau edit
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>

        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Tambah Todo
        </button>

        {/* Modal Form */}
        <TodoForm
          onAddTodo={handleAddTodo}
          editTodo={editTodo}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditTodo(null);
          }}
        />

        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
      </header>
    </div>
  );
};

export default TodoPage;
