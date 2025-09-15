// server/routes/streakRoutes.js
import express from "express";
import { getStreaks } from "../controllers/streakController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getStreaks);

export default router;
