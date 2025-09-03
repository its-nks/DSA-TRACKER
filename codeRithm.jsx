import React from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl font-bold">Practice+ AI</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 mt-20">
        <h2 className="text-5xl font-extrabold mb-6">
          Practice Smarter, Not Harder 🚀
        </h2>
        <p className="text-lg max-w-2xl mb-8">
          An adaptive learning platform that analyzes your capacity and
          gives you daily personalized practice problems to boost efficiency.
        </p>

        <div className="space-x-4">
          <Button asChild className="bg-white text-indigo-600 font-semibold hover:bg-gray-200">
            <a href="/signup">Get Started</a>
          </Button>
          <Button asChild className="bg-transparent border border-white hover:bg-white hover:text-indigo-600">
            <a href="/login">Login</a>
          </Button>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="mt-28 px-10 max-w-4xl text-center">
        <h3 className="text-3xl font-bold mb-6">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white text-indigo-700 rounded-2xl shadow-lg">
            <h4 className="font-bold mb-2">Adaptive Practice</h4>
            <p>System adjusts difficulty based on your performance.</p>
          </div>
          <div className="p-6 bg-white text-indigo-700 rounded-2xl shadow-lg">
            <h4 className="font-bold mb-2">Daily Quotient</h4>
            <p>Get a personalized practice quota every day.</p>
          </div>
          <div className="p-6 bg-white text-indigo-700 rounded-2xl shadow-lg">
            <h4 className="font-bold mb-2">Progress Tracking</h4>
            <p>Visualize your strengths and weak areas on dashboard.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-28 py-6 w-full text-center bg-indigo-900">
        <p className="text-sm">
          © {new Date().getFullYear()} Practice+ AI. Built with 💙 for learners.
        </p>
      </footer>
    </div>
  );
}
