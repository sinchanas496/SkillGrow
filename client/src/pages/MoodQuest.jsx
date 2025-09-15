// src/pages/MoodQuest.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";

export default function MoodQuest() {
  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-200" },
    { emoji: "😐", label: "Calm", color: "bg-blue-200" },
    { emoji: "😟", label: "Sad", color: "bg-gray-300" },
    { emoji: "🔥", label: "Motivated", color: "bg-red-200" },
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState([]);

  const quotes = [
    "Every small step counts toward growth 🌱",
    "Consistency is the key to mastery 🔑",
    "Your mood today doesn’t define tomorrow 🌈",
    "Keep pushing forward, you're doing great 🚀",
    "Happiness grows when shared 💫",
  ];
  const [quote, setQuote] = useState(null);

  const logMood = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    const newLog = { date: today, mood, note };
    setLogs((prev) => [...prev.filter((l) => l.date !== today), newLog]);
    setSelectedMood(null);
    setNote("");
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  // Streak calculation
  const getStreak = () => {
    let streak = 0;
    let date = new Date();
    for (;;) {
      const dateStr = date.toISOString().split("T")[0];
      if (logs.some((l) => l.date === dateStr)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else break;
    }
    return streak;
  };

  // Mood Avatar based on streak/mood
  const getAvatar = () => {
    const streak = getStreak();
    if (streak >= 7) return "🦁"; // strong lion
    if (streak >= 3) return "🐼"; // steady panda
    return "🐣"; // starter chick
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100">
      <Navbar />

      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🎯 MoodQuest
        </h1>
        <p className="mt-3 text-gray-600">
          Track emotions, unlock badges, and grow your Mood Avatar 🌟
        </p>

        {/* Avatar */}
        <div className="mt-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl"
          >
            {getAvatar()}
          </motion.div>
          <p className="mt-2 text-gray-500">Your Mood Avatar evolves with your streaks</p>
        </div>

        {/* Mood Selector */}
        <div className="flex justify-center gap-6 mt-10">
          {moods.map((m) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              key={m.label}
              onClick={() => setSelectedMood(m)}
              className={`flex flex-col items-center p-4 rounded-2xl shadow ${m.color}`}
            >
              <span className="text-4xl">{m.emoji}</span>
              <p className="mt-2 font-semibold">{m.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Mood Journal */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto"
          >
            <h3 className="text-xl font-bold mb-4">
              {selectedMood.emoji} {selectedMood.label} - Add a Note
            </h3>
            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Write about your day..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              onClick={() => logMood(selectedMood)}
              className="mt-4 px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              Save Mood
            </button>
          </motion.div>
        )}

        {/* Streak + Achievements */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">🔥 Current Streak: {getStreak()} days</h2>
          <div className="flex justify-center gap-4 mt-4">
            {getStreak() >= 3 && <span className="px-3 py-1 bg-yellow-200 rounded-full">🌟 3-Day Streak</span>}
            {getStreak() >= 7 && <span className="px-3 py-1 bg-green-200 rounded-full">🏆 7-Day Champion</span>}
          </div>
        </div>

        {/* Reflection Quote */}
        {quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 bg-indigo-50 border border-indigo-200 p-6 rounded-2xl max-w-lg mx-auto"
          >
            <p className="text-lg italic text-indigo-700">💡 {quote}</p>
          </motion.div>
        )}

        {/* Journal List */}
        <div className="mt-12 text-left">
          <h2 className="text-2xl font-bold mb-4">📖 Mood Journal</h2>
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Start your MoodQuest!</p>
          ) : (
            <ul className="space-y-4">
              {logs.map((log) => (
                <li key={log.date} className="bg-white p-4 rounded-xl shadow flex justify-between">
                  <div>
                    <p className="font-semibold">
                      {log.date} - {log.mood.emoji} {log.mood.label}
                    </p>
                    {log.note && <p className="text-gray-600 text-sm mt-1">{log.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
