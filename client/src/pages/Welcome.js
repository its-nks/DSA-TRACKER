import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome({ startTask }) {
  const navigate = useNavigate();

  const handleStart = () => {
    startTask();          // initialize userProgress in App.js
    navigate("/tasks");   // go to first task
  };

  return (
    <div className="welcome-page" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to CODRITHM!</h1>
      <p>Let's start your first task and track your progress.</p>
      <button onClick={handleStart} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Start My First Task
      </button>
    </div>
  );
}
