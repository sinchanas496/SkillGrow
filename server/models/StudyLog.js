// server/models/StudyLog.js
import mongoose from "mongoose";

const studyLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    confidence: { type: Number, min: 1, max: 5, required: true },
    minutes: { type: Number, min: 0, default: 0 },
    note: { type: String, trim: true },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default mongoose.model("StudyLog", studyLogSchema);
