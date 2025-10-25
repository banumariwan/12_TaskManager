import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ text: "", priority: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.text || !formData.priority) return;

    const newTask = {
      id: Date.now(),
      text: formData.text,
      priority: formData.priority,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setFormData({ text: "", priority: "" });
  };

  const handleToggleDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Task Manager</h1>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          name="text"
          placeholder="Enter new task"
          value={formData.text}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Priority</option>
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>

      <div style={styles.list}>
        {tasks.length === 0 ? (
          <p>No tasks yet...</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                ...styles.task,
                backgroundColor:
                  task.priority === "High"
                    ? "#ffe5e5"
                    : task.priority === "Medium"
                    ? "#fff8e1"
                    : "#e8f5e9",
              }}
            >
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                  flexGrow: 1,
                }}
              >
                {task.text} – <em>{task.priority}</em>
              </span>

              <button
                onClick={() => handleToggleDone(task.id)}
                style={styles.toggleBtn}
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                style={styles.deleteBtn}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "40px",
  },
  title: {
    color: "#1976d2",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "220px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    width: "80%",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  task: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
  },
  toggleBtn: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
