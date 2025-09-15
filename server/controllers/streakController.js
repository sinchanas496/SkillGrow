// server/controllers/streakController.js
import StudyLog from "../models/StudyLog.js";

// helper: strip time part
const normalizeDate = (date) => new Date(date.toISOString().split("T")[0]);

export const getStreaks = async (req, res) => {
  try {
    const userId = req.user._id;

    // get all logs sorted by date
    const logs = await StudyLog.find({ user: userId }).sort({ date: 1 });

    if (logs.length === 0) {
      return res.json({ currentStreak: 0, longestStreak: 0, subjectStreaks: {} });
    }

    // normalize log dates (remove time part)
    const uniqueDates = [...new Set(logs.map(l => normalizeDate(l.date).getTime()))]
      .map(d => new Date(d))
      .sort((a, b) => a - b);

    let currentStreak = 1;
    let longestStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = uniqueDates[i - 1];
      const curr = uniqueDates[i];
      const diff = (curr - prev) / (1000 * 60 * 60 * 24); // days between

      if (diff === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    // check if today is included
    const today = normalizeDate(new Date()).getTime();
    if (uniqueDates[uniqueDates.length - 1].getTime() !== today) {
      currentStreak = 0; // streak broken
    }

    // subject-wise streaks
    const subjectStreaks = {};
    logs.forEach(log => {
      const dateKey = normalizeDate(log.date).toISOString().split("T")[0];
      if (!subjectStreaks[log.subject]) subjectStreaks[log.subject] = new Set();
      subjectStreaks[log.subject].add(dateKey);
    });

    const subjectStats = {};
    for (const subject in subjectStreaks) {
      subjectStats[subject] = subjectStreaks[subject].size;
    }

    res.json({ currentStreak, longestStreak, subjectStats });
  } catch (err) {
    console.error("Streak error:", err);
    res.status(500).json({ error: "Failed to calculate streaks" });
  }
};
