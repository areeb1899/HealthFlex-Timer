import React, { useState, useEffect, useContext } from "react";
import TimerForm from "../components/TimerForm";
import TimerList from "../components/TimerList";
import { ThemeContext } from "../context/DarkTheme";

const Home = () => {
  const [timers, setTimers] = useState([]);
  const { darkMode } = useContext(ThemeContext);


  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    setTimers(savedTimers);
  }, []);

  const addTimer = (newTimer) => {
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    localStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  const updateTimerStatus = (timerId, status) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === timerId ? { ...timer, status } : timer
    );
    setTimers(updatedTimers);
    localStorage.setItem("timers", JSON.stringify(updatedTimers));


    if (status === "Completed") {
      const history = JSON.parse(localStorage.getItem("history")) || [];
      const completedTimer = timers.find((timer) => timer.id === timerId);
      if (completedTimer) {
        const updatedHistory = [...history, { ...completedTimer, completedAt: new Date() }];
        localStorage.setItem("history", JSON.stringify(updatedHistory));
      }
    }
  };

  const deleteTimer = (timerId) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    localStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  return (
      <div className={`page-container ${darkMode ? "dark" : ""}`}>
      <h1>Timer App</h1>
      <TimerForm addTimer={addTimer} />
      <TimerList timers={timers} onUpdate={updateTimerStatus} onDelete={deleteTimer} />
    </div>
  );
};

export default Home;
