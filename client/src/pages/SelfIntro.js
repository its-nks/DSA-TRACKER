import React, { useState } from "react";
import { useUser } from '../UserContext';
import { useNavigate } from "react-router-dom";


function SelfIntro() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    skillLevel: "",
    preferredTopic: "",
    freeTime: "",
    goal: "",
    dsaStatus: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user info in context
    setUser({
      ...user,
      name: formData.name,
      skillLevel: formData.skillLevel,
      subscription: false, // default false
    });

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.wallpapersden.com/image/download/programming-coding-language_bGhpbm6UmZqaraWkpJRmbmdlrWZlbWU.jpg')",
      }}
    >
      <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-[#0A192F] mb-2">
          CODRITHM
        </h1>
        <p className="text-center text-[#0A192F] mb-6">Your Personal Information</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Other Interests:</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. AI, Web Dev, CP"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">DSA Skill Level:</label>
            <select
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Preferred Topic */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Preferred DSA Topic:</label>
            <input
              type="text"
              name="preferredTopic"
              value={formData.preferredTopic}
              onChange={handleChange}
              placeholder="e.g. Arrays, Graphs, DP"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* DSA Status */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Your Current DSA Status:</label>
            <select
              name="dsaStatus"
              value={formData.dsaStatus}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select</option>
              <option>I have already done some topics</option>
              <option>I want a complete fresh start</option>
              <option>I want to revise and practice</option>
            </select>
          </div>

          {/* Free Time */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Daily Time Commitment (hours):</label>
            <input
              type="number"
              name="freeTime"
              value={formData.freeTime}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-[#0A192F]">Your Goal:</label>
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. Crack coding interviews, improve problem-solving"
              className="mt-1 w-full px-3 py-2 border border-[#2563EB] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#1D4ED8] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelfIntro;
