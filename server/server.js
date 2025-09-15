// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";

dotenv.config();
console.log("HF KEY loaded:", process.env.HUGGINGFACE_API_KEY ? "YES" : "NO");
await connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/streaks", streakRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
