import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SelfIntro from "./pages/SelfIntro";
import Progress from "./pages/Progress";
import Dashboard from "./pages/Dashboard";
import DailyTasks from "./pages/DailyTasks"; // Task page
import { UserProvider } from "./UserContext";
import Welcome from "./pages/Welcome"; // new welcome page

function App() {
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem("userProgress");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userProgress) {
      localStorage.setItem("userProgress", JSON.stringify(userProgress));
    }
  }, [userProgress]);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Brand-new users see Welcome */}
          <Route
            path="/"
            element={
              userProgress ? (
                <Navigate to="/dashboard" /> // returning users → Dashboard
              ) : (
                <Welcome startTask={() => setUserProgress({ tasks: [], beginnerProgress: 0 })} />
              )
            }
          />
          {/* Task route */}
          <Route
            path="/tasks"
            element={
              userProgress ? (
                <DailyTasks
                  userProgress={userProgress}
                  setUserProgress={setUserProgress}
                />
              ) : (
                <Navigate to="/" /> // redirect if brand-new
              )
            }
          />
          {/* Other pages */}
          <Route path="/progress" element={<Progress />} />
          <Route path="/dashboard" element={<Dashboard userProgress={userProgress} />} />
          <Route path="/selfintro" element={<SelfIntro />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
