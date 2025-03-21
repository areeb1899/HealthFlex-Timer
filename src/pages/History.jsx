import React, { useState, useEffect, useContext } from "react";
import "../styles/History.css";
import { ThemeContext } from "../context/DarkTheme";

const History = () => {
  const [history, setHistory] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")) || []);
  }, []);

  const exportHistory = () => {
    if (!history.length) return alert("No history to export.");

    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "timer-history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`history-container ${darkMode ? "dark" : ""}`}>
      <h1>Completed Timers</h1>
      <button className="export-btn" onClick={exportHistory}>📂 Export JSON</button>

      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty-message">No completed timers yet.</p>
        ) : (
          history.map((timer, index) => (
            <div key={index} className="history-item">
              <h3>{timer.name}</h3>
              <p><strong>Completed At:</strong> {new Date(timer.completedAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
