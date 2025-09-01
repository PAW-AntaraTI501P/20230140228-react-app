import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  width: 80%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.edit ? "#2196F3" : "#87CEEB")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin: 5px;
`;

const TodoForm = ({ onAddTodo, editTodo, isOpen, onClose }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTask(editTodo.task);
    } else {
      setTask("");
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    onAddTodo(task);
    setTask("");
    onClose(); // tutup modal setelah submit
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <h2>{editTodo ? "Edit Todo" : "Tambah Todo Baru"}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div>
          <Button type="submit" edit={editTodo}>
            {editTodo ? "Update" : "Tambah"}
          </Button>
          <Button type="button" onClick={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoForm;
