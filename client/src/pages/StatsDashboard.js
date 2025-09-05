// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);

  // Sample progress over past 7 days
  const [progressData, setProgressData] = useState([
    { day: "Mon", completed: 1 },
    { day: "Tue", completed: 0 },
    { day: "Wed", completed: 1 },
    { day: "Thu", completed: 1 },
    { day: "Fri", completed: 0 },
    { day: "Sat", completed: 1 },
    { day: "Sun", completed: 1 },
  ]);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    let streakCount = parseInt(localStorage.getItem("streak") || "0");
    const today = new Date().toDateString();

    if (lastVisit === today) {
      // Already visited today
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
        streakCount += 1;
      } else {
        streakCount = 1;
      }

      localStorage.setItem("lastVisit", today);
      localStorage.setItem("streak", streakCount);
    }

    setStreak(streakCount);
  }, []);

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center overflow-auto"
      style={{
        backgroundImage:
          "url('https://images.wallpapersden.com/image/download/programming-coding-language_bGhpbm6UmZqaraWkpJRmbmdlrWZlbWU.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-[#0A192F] mb-6">
        CODRITHM Dashboard
      </h1>

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

      {/* Progress Graph */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0A192F]">Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tips / Motivation */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0A192F]">Tips for Consistency</h2>
        <ul className="list-disc list-inside text-[#0A192F] space-y-2">
          <li>Try to complete at least one topic every day.</li>
          <li>Set small achievable goals to maintain streaks.</li>
          <li>Use breaks wisely to avoid burnout.</li>
          <li>Review previous topics to reinforce knowledge.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
