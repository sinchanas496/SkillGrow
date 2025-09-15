import express from "express";
import { getSuggestions } from "../utils/suggestions.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const suggestion = await getSuggestions(prompt);
  res.json({ suggestion });
});

export default router;
