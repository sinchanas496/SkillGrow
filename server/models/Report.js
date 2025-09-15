// server/routes/reportRoutes.js
import express from "express";
import { auth } from "../middleware/auth.js";   // ✅ fixed import
import Report from "../models/Report.js";       // assuming you already created Report model
import StudyLog from "../models/StudyLog.js";

const router = express.Router();

// 📌 Create a report (generate summary of user’s study logs)
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // get logs of this user
    const logs = await StudyLog.find({ user: userId });

    // Example: simple stats (can expand later)
    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);
    const avgConfidence =
      logs.length > 0
        ? logs.reduce((sum, log) => sum + log.confidence, 0) / logs.length
        : 0;

    const report = new Report({
      user: userId,
      totalMinutes,
      avgConfidence,
      createdAt: new Date(),
    });

    await report.save();

    res.status(201).json(report);
  } catch (err) {
    console.error("Error creating report:", err.message);
    res.status(500).json({ error: "Failed to create report" });
  }
});

// 📌 Get all reports for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err.message);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;
