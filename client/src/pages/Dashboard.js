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
  const [progressData, setProgressData] = useState([]);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    // Load stored data if any
    const lastVisit = localStorage.getItem("lastVisit");
    let streakCount = parseInt(localStorage.getItem("streak") || "0");
    const storedProgress = JSON.parse(localStorage.getItem("progressData") || "[]");

    // Check if completely new user
    if (!lastVisit && storedProgress.length === 0) {
      setIsNewUser(true);
      return;
    }

    setIsNewUser(false);

    // Handle streak logic
    const today = new Date().toDateString();
    if (lastVisit !== today) {
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
    setProgressData(storedProgress.length ? storedProgress : []);
  }, []);

  if (isNewUser) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-4">👋 Welcome to CODRITHM!</h1>
        <p className="text-lg mb-6 text-center max-w-xl">
          You’re just starting your journey. Complete your first daily task to unlock progress tracking, streaks, and more 🚀
        </p>
        <a
          href="/tasks"
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow hover:bg-gray-200"
        >
          Start My First Task →
        </a>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen p-6 bg-cover bg-center overflow-auto"
      style={{
        backgroundImage:
          "url('https://images.wallpapersden.com/image/download/programming-coding-language_bGhpbm6UmZqaraWkpJRmbmdlrWZlbWU.jpg')",
      }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-white drop-shadow-lg mb-6">
        🚀 CODRITHM Dashboard
      </h1>

      {/* Streak Card */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold text-[#0A192F] mb-2">
          🔥 Your Daily Streak
        </h2>
        <p className="text-[#0A192F] mb-4">
          Consecutive days visited: {streak}
        </p>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div
            className="bg-[#2563EB] h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(streak * 10, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Progress Graph */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0A192F]">
          📊 Weekly Progress
        </h2>
        {progressData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={progressData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600">No progress yet. Complete tasks to see your chart!</p>
        )}
      </div>

      {/* Motivation Section */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0A192F]">
          💡 Tips for Consistency
        </h2>
        <ul className="list-disc list-inside text-[#0A192F] space-y-2">
          <li>Complete at least one question daily to keep your streak alive.</li>
          <li>Set small goals like 3–5 problems per week.</li>
          <li>Mix easy and medium problems to stay motivated.</li>
          <li>Revisit solved problems to strengthen memory.</li>
        </ul>
      </div>

      {/* Button to Go to Daily Tasks */}
      <div className="mt-4">
        <a
          href="/tasks"
          className="px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg shadow hover:bg-blue-700"
        >
          🚀 Go to Daily Tasks
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
