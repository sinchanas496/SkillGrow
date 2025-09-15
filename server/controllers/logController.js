// server/controllers/logController.js
import StudyLog from "../models/StudyLog.js";

// 📌 Create a new study log
export const createLog = async (req, res) => {
  try {
    const { subject, topic, confidence, minutes, note, date } = req.body;

    if (!subject || !topic || !confidence) {
      return res.status(400).json({ error: "Subject, topic, and confidence are required." });
    }

    const newLog = new StudyLog({
      user: req.user._id, // ✅ Fix: use _id from auth middleware
      subject,
      topic,
      confidence,
      minutes,
      note,
      date,
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    console.error("Error creating study log:", err.message);
    res.status(500).json({ error: "Failed to save study log." });
  }
};

// 📌 Get all logs for the logged-in user
export const getLogs = async (req, res) => {
  try {
    const logs = await StudyLog.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    res.status(500).json({ error: "Failed to fetch logs." });
  }
};

// 📌 Delete a log
export const deleteLog = async (req, res) => {
  try {
    const log = await StudyLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!log) {
      return res.status(404).json({ error: "Log not found." });
    }

    res.json({ message: "Log deleted successfully." });
  } catch (err) {
    console.error("Error deleting log:", err.message);
    res.status(500).json({ error: "Failed to delete log." });
  }
};

// 📌 Update a log
export const updateLog = async (req, res) => {
  try {
    const { subject, topic, confidence, minutes, note, date } = req.body;

    const log = await StudyLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { subject, topic, confidence, minutes, note, date },
      { new: true }
    );

    if (!log) {
      return res.status(404).json({ error: "Log not found." });
    }

    res.json(log);
  } catch (err) {
    console.error("Error updating log:", err.message);
    res.status(500).json({ error: "Failed to update log." });
  }
};
