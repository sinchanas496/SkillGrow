// server/controllers/reportController.js
import Report from "../models/Report.js";
import StudyLog from "../models/StudyLog.js";

export const generateReport = async (req, res) => {
  try {
    const userId = req.user.id;

    // fetch all study logs of user
    const logs = await StudyLog.find({ user: userId });

    if (!logs.length) {
      return res.status(400).json({ message: "No study logs found" });
    }

    // calculate stats
    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);
    const averageConfidence =
      logs.reduce((sum, log) => sum + log.confidence, 0) / logs.length;

    const subjects = {};
    logs.forEach((log) => {
      subjects[log.subject] = (subjects[log.subject] || 0) + log.minutes;
    });

    // create report
    const report = await Report.create({
      user: userId,
      logs: logs.map((log) => log._id),
      stats: { totalMinutes, averageConfidence, subjects },
    });

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
