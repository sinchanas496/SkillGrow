// server/routes/logRoutes.js
import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createLog,
  getLogs,
  updateLog,
  deleteLog,
} from "../controllers/logController.js";

const router = express.Router();

// 📌 Create a new study log
router.post("/", auth, createLog);

// 📌 Get all logs for logged-in user
router.get("/", auth, getLogs);

// 📌 Update a log
router.put("/:id", auth, updateLog);

// 📌 Delete a log
router.delete("/:id", auth, deleteLog);

export default router;
