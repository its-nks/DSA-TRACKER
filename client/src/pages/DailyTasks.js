import React, { useEffect, useState } from "react";

function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem("totalPoints") || "0");
  });
  const [rewardShown, setRewardShown] = useState(false);

  useEffect(() => {
    const questionBank = [
      { title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
      { title: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { title: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },
      { title: "Merge Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/merge-intervals/" },
      { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { title: "Word Ladder", difficulty: "Hard", link: "https://leetcode.com/problems/word-ladder/" },
    ];

    const today = new Date().toDateString();
    const saved = localStorage.getItem("dailyTasks");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setTasks(parsed.tasks);
        return;
      }
    }

    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    const todayTasks = shuffled.slice(0, 3).map((t) => ({ ...t, done: false }));

    localStorage.setItem("dailyTasks", JSON.stringify({ date: today, tasks: todayTasks }));
    setTasks(todayTasks);
  }, []);

  const markDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);

    const today = new Date().toDateString();
    localStorage.setItem("dailyTasks", JSON.stringify({ date: today, tasks: newTasks }));

    // Update points
    const completedCount = newTasks.filter((t) => t.done).length;
    const earnedPoints = completedCount * 10;
    setPoints(earnedPoints);
    localStorage.setItem("totalPoints", earnedPoints);

    // Show reward popup if all tasks done
    if (completedCount === newTasks.length && !rewardShown) {
      setRewardShown(true);
      alert(`🎉 Congrats! You earned ${earnedPoints} points today!`);
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div
      className="flex flex-col items-center min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.wallpapersden.com/image/download/programming-coding-language_bGhpbm6UmZqaraWkpJRmbmdlrWZlbWU.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-6">📝 Daily Tasks</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6">
        <p className="text-white mb-1">
          Today's Progress: {progressPercent}% | Points: {points}
        </p>
        <div className="h-4 bg-white/30 rounded-xl overflow-hidden">
          <div
            className="h-4 bg-[#2563EB] rounded-xl transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        {tasks.length === 0 ? (
          <p className="text-[#0A192F]">No tasks available. Come back tomorrow!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task, i) => (
              <li
                key={i}
                className={`p-4 border rounded-xl flex justify-between items-center transition-all duration-300 ${
                  task.done
                    ? "bg-green-100 border-green-500 shadow-inner"
                    : "bg-white border-[#2563EB] shadow-md hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                <div>
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#2563EB] hover:underline transition-colors duration-200"
                  >
                    {task.title}
                  </a>
                  <p className="text-sm text-gray-600">Difficulty: {task.difficulty}</p>
                </div>
                <button
                  onClick={() => markDone(i)}
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                    task.done ? "bg-green-600 hover:bg-green-700" : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                  }`}
                >
                  {task.done ? "✅ Done" : "Mark Done"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DailyTasks;
