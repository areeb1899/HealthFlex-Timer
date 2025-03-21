import React, { useState, useContext } from "react";
import "../styles/TimerForm.css";
import { ThemeContext } from "../context/DarkTheme";

const TimerForm = ({ addTimer }) => {
  const { darkMode } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Workout");
  const [duration, setDuration] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a timer name.");

    const newTimer = {
      id: Date.now(),
      name,
      category,
      duration,
      status: "Pending",
    };

    addTimer(newTimer);
    setName("");
    setDuration(60);
  };

  return (
    <div className={`timer-form-container ${darkMode ? "dark" : ""}`}>
      <h2>Create a New Timer</h2>
      <form onSubmit={handleSubmit}>
        <label>Timer Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter timer name"
          required
        />


        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Workout</option>
          <option>Study</option>
          <option>Break</option>
          <option>Cooking</option>
          <option>Sleep</option>
          <option>Meditation</option>
          <option>Productivity</option>
          <option>Meeting</option>
          <option>Custom Reminder</option>
          <option>Gaming</option>
        </select>

        <label>Duration (seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />

        <button type="submit">Add Timer</button>
      </form>
    </div>
  );
};

export default TimerForm;
