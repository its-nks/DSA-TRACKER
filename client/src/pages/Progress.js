// src/pages/Progress.js
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";

function Progress() {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);

  // Initialize navigate
  const navigate = useNavigate();

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    let streakCount = parseInt(localStorage.getItem("streak") || "0");
    const today = new Date().toDateString();

    if (lastVisit === today) {
      // Already visited today, keep streak
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
        streakCount += 1; // consecutive day
      } else {
        streakCount = 1; // reset
      }

      localStorage.setItem("lastVisit", today);
      localStorage.setItem("streak", streakCount);
    }

    setStreak(streakCount);
  }, []);

  // Sample progress for visualization
  const goals = [
    { title: "Arrays", completed: true },
    { title: "Linked List", completed: false },
    { title: "Graphs", completed: true },
    { title: "Dynamic Programming", completed: false },
  ];

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center overflow-auto"
      style={{
        backgroundImage:
          "url('https://images.wallpapersden.com/image/download/programming-coding-language_bGhpbm6UmZqaraWkpJRmbmdlrWZlbWU.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-[#0A192F] mb-6">CODRITHM Progress</h1>

      {/* Streak Card */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold text-[#0A192F] mb-2">🔥 Your Daily Streak</h2>
        <p className="text-[#0A192F] mb-4">Consecutive days visited: {streak}</p>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div
            className="bg-[#2563EB] h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(streak * 10, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-3xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#0A192F]">DSA Topic Progress</h2>
        <ul className="space-y-3">
          {goals.map((g, i) => (
            <li
              key={i}
              className={`p-3 border border-[#2563EB] rounded-lg flex justify-between items-center ${
                g.completed ? "bg-[#DCEEFB]" : "bg-white"
              }`}
            >
              <span>{g.title}</span>
              <span className="font-bold">{g.completed ? "✔️" : "❌"}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigate to StatsDashboard */}
      <button
        onClick={() => navigate("/stats")}
        className="mt-6 w-full max-w-3xl bg-[#2563EB] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#1D4ED8] transition"
      >
        Go to Stats Dashboard
      </button>
    </div>
  );
}

export default Progress;

