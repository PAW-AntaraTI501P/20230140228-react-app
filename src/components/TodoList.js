// src/components/TodoList.js
import React from "react";
import DataTable from "react-data-table-component";

const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  // Definisi kolom untuk tabel
  const columns = [
    {
      name: "Task",
      selector: (row) => row.task,
      sortable: true,
      cell: (row) => (
        <span style={{ textDecoration: row.completed ? "line-through" : "none", fontWeight: "bold" }}>
          {row.task}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => (row.completed ? "Selesai" : "Belum"),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div>
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={() => onToggleCompleted(row.id, row.completed)}
          >
            {row.completed ? "Batal" : "Selesai"}
          </button>
          <button
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              padding: "5px 10px",
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={() => onEditTodo(row)}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => onDeleteTodo(row.id)}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Daftar Todo"
      columns={columns}
      data={todos}
      pagination
      highlightOnHover
      striped
      responsive
    />
  );
};

export default TodoList;
