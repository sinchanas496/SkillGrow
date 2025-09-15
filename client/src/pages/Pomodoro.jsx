// src/pages/Pomodoro.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { motion } from "framer-motion";
import { Flame, CheckCircle } from "lucide-react";

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus" | "short" | "long"
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [showMood, setShowMood] = useState(false);
  const [mood, setMood] = useState(null);

  // durations in seconds
  const durations = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

  useEffect(() => {
    let timer;
    if (running && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      setRunning(false);
      setCompleted((c) => c + 1);
      setStreak((s) => s + (mode === "focus" ? 1 : 0));
      setShowMood(true);
    }
    return () => clearInterval(timer);
  }, [running, time, mode]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  const startSession = (newMode) => {
    setMode(newMode);
    setTime(durations[newMode]);
    setRunning(false);
  };

  const moods = ["😃", "😐", "😫"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-200">
      {/* Keep navbar outside padding so it's full width */}
      <Navbar />

      <div className="max-w-xl mx-auto text-center mt-8 px-6">
        <h1 className="text-3xl font-bold mb-4">⏳ Pomodoro Timer</h1>

        {/* Circular Timer */}
        <motion.div
          key={time}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-64 h-64 rounded-full border-8 border-indigo-500 flex items-center justify-center mx-auto shadow-lg bg-white"
        >
          <span className="text-5xl font-mono text-indigo-700">
            {minutes}:{seconds}
          </span>
        </motion.div>

        {/* Controls */}
        <div className="mt-6 space-x-3">
          <button
            onClick={() => setRunning(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={() => setRunning(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
          >
            Pause
          </button>
          <button
            onClick={() => startSession(mode)}
            className="px-4 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => startSession("focus")}
            className={`px-3 py-1 rounded-lg ${
              mode === "focus" ? "bg-indigo-500 text-white" : "bg-white"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => startSession("short")}
            className={`px-3 py-1 rounded-lg ${
              mode === "short" ? "bg-indigo-500 text-white" : "bg-white"
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => startSession("long")}
            className={`px-3 py-1 rounded-lg ${
              mode === "long" ? "bg-indigo-500 text-white" : "bg-white"
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow flex items-center justify-center">
            <Flame className="text-orange-500 mr-2" />
            <span className="font-semibold">Streak: {streak}</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow flex items-center justify-center">
            <CheckCircle className="text-green-500 mr-2" />
            <span className="font-semibold">Completed: {completed}</span>
          </div>
        </div>

        {/* Mood Prompt */}
        {showMood && (
          <div className="mt-6 p-4 bg-white rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              How do you feel after this session?
            </h2>
            <div className="flex justify-center gap-4 text-3xl">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMood(m);
                    setShowMood(false);
                  }}
                  className={`p-2 ${
                    mood === m ? "bg-indigo-200 rounded-full" : ""
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
