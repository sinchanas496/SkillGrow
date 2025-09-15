import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { motion } from "framer-motion";
import { Flame, Award } from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function Streaks() {
  const [streaks, setStreaks] = useState(null);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/streaks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStreaks(data);
      } catch (err) {
        console.error("Failed to fetch streaks", err);
      }
    };
    fetchStreaks();
  }, []);

  if (!streaks) return <p className="p-6">Loading...</p>;

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2); // last 2 months heatmap

  // Prepare heatmap values from subjectStats (fake intensity using streaks)
  const heatmapValues = Object.entries(streaks.subjectStats).map(([subject, days], i) => ({
    date: new Date(today.getTime() - i * 86400000).toISOString().split("T")[0],
    count: days,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-indigo-700 flex items-center justify-center gap-2">
          <Flame className="text-orange-500 w-8 h-8" /> Streaks
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Keep building consistency every day 📅
        </p>

        {/* Current & Longest Streak */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-600">🔥 Current Streak</h2>
            <p className="text-4xl font-bold text-indigo-700 mt-2">
              {streaks.currentStreak} days
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-600">🏆 Longest Streak</h2>
            <p className="text-4xl font-bold text-purple-700 mt-2">
              {streaks.longestStreak} days
            </p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="mt-10 bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📊 Study Heatmap</h2>
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={heatmapValues}
            classForValue={(val) => {
              if (!val) return "color-empty";
              return `color-scale-${Math.min(val.count, 4)}`;
            }}
          />
          <style>
            {`
              .color-empty { fill: #f0f0f0; }
              .color-scale-1 { fill: #c6dbef; }
              .color-scale-2 { fill: #6baed6; }
              .color-scale-3 { fill: #3182bd; }
              .color-scale-4 { fill: #08519c; }
            `}
          </style>
        </div>

        {/* Subject streaks */}
        <div className="mt-10 bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📚 Subject Streaks</h2>
          <ul className="space-y-2">
            {Object.entries(streaks.subjectStats).map(([sub, days]) => (
              <li key={sub} className="flex justify-between text-lg">
                <span className="font-medium text-gray-700">{sub}</span>
                <span className="font-bold text-indigo-600">{days} days</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Badges */}
        <div className="mt-10 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Award className="text-yellow-500" /> Achievements
          </h2>
          <div className="flex gap-4 justify-center">
            {streaks.longestStreak >= 7 && (
              <span className="px-4 py-2 bg-yellow-300 rounded-full font-medium">
                🌟 7-Day Warrior
              </span>
            )}
            {streaks.longestStreak >= 30 && (
              <span className="px-4 py-2 bg-pink-300 rounded-full font-medium">
                🚀 30-Day Champion
              </span>
            )}
            {streaks.longestStreak >= 100 && (
              <span className="px-4 py-2 bg-purple-300 rounded-full font-medium">
                👑 100-Day Legend
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
