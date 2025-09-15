import express from "express";
import { generateReport, getReports } from "../controllers/reportController.js";
import {auth} from "../middleware/auth.js";

const router = express.Router();

// generate a new report
router.post("/generate", auth, generateReport);

// get all past reports
router.get("/", auth, getReports);

export default router;
