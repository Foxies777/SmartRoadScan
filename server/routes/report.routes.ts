import express, { Request, Response } from "express";
import { getReports, createReport, getFilteredReports, updateReportStatus } from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getReports);
router.post("/", createReport);
router.get('/reports', getFilteredReports);
router.patch("/reports/:reportId/status", updateReportStatus);

export default router;