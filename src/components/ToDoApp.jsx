import React, { useState } from 'react';
import styles from "../styles/TodoApp.module.css"
import { RiDeleteBin6Fill } from "react-icons/ri";


function App() {
  const [inputText, setInputText] = useState(""); // stores what's typed in input
  const [todoList, setTodoList] = useState([]); // stores all todo items

  // Add a task to the list
  const handleAddTask = () => {
    if (inputText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodoList([...todoList, newTask]); // add new task
    setInputText(""); // clear input
  };

  // Delete task by id
  const handleDeleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  // Toggle completed
  const handleToggleComplete = (id) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1>ToDo App</h1>

      <div className={styles["input-area"]}> 
        <input
          type="text"
          placeholder="Type your task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul>
        {todoList.map((task) => (
          <li key={task.id} className={styles["task-item"]}> 
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}><RiDeleteBin6Fill /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
