import React, { useContext, useEffect, useState } from "react";
import "../styles/TimerItem.css";
import { ThemeContext } from "../context/DarkTheme";

const TimerItem = ({ timer, onUpdate, onDelete }) => {
  const [remainingTime, setRemainingTime] = useState(timer.duration); 
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [halfwayAlertShown, setHalfwayAlertShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useContext(ThemeContext); 



  useEffect(() => {
    let interval;

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;

          
          if (!halfwayAlertShown && newTime === Math.floor(timer.duration / 2)) {
            alert(`⏳ "${timer.name}" is 50% complete!`);
            setHalfwayAlertShown(true);
          }

          return newTime;
        });
      }, 1000);
    } else if (remainingTime === 0 && !isCompleted) {
      setIsRunning(false);
      setIsCompleted(true);
      setShowModal(true);
      onUpdate(timer.id, "Completed");
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingTime, halfwayAlertShown, onUpdate, timer.id, timer.duration]);



  // Reset Timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setHalfwayAlertShown(false);
    setRemainingTime(timer.duration);
    setShowModal(false);
  };

  // Status of the timer
  const getStatus = () => {
    if (isCompleted) return "✅ Completed";
    return isRunning ? "⏳ Running" : "⏸️ Paused";
  };

  return (
    <div className={`timer-item ${darkMode ? "dark" : ""} ${isCompleted ? "completed" : ""}`}>
      <h3>{timer.name}</h3>
      <p>Category: {timer.category}</p>
      <p>Time Left: {isCompleted ? "0s" : `${remainingTime}s`}</p>

    
      <div className="status">
        Status: <span className={isCompleted ? "completed-status" : isRunning ? "running-status" : "paused-status"}>{getStatus()}</span>
      </div>

      <div className="progress-container">
        <div className="progress-bar"
             style={{ width: isCompleted ? "100%" : `${(remainingTime / timer.duration) * 100}%` }}>
        </div>
      </div>

      <div className="controls">
        {!isCompleted && (
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </button>
        )}
        <button onClick={resetTimer}>Reset</button>
        <button onClick={() => onDelete(timer.id)}>Delete</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Timer Completed!</h2>
            <p>✅ <strong>{timer.name}</strong> is done!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerItem;
