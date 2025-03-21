import React, { useContext, useState } from "react";
import TimerItem from "./TimerItem";
import "../styles/TimerList.css";
import { ThemeContext } from "../context/DarkTheme";

const TimerList = ({ timers, onUpdate, onDelete }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const { darkMode } = useContext(ThemeContext);

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className={`timer-list ${darkMode ? "dark" : ""}`}>
      {Object.keys(groupedTimers).map((category) => (
        <div key={category} className="category-section">
          <div className="category-header" onClick={() => toggleCategory(category)}>
            <h2>{category}</h2>
            <span>{expandedCategories[category] ? "🔼" : "🔽"}</span>
          </div>

          <div className={`category-content ${expandedCategories[category] ? "expanded" : ""}`}>
            {groupedTimers[category].map((timer) => (
              <TimerItem key={timer.id} timer={timer} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerList;
