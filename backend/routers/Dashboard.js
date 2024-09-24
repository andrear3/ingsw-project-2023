import express from "express";
import { DashboardCTRL } from "../controllers/DashboardCTRL.js";
import { authToken } from "../middleware/Auth.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";

export const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard", authToken, async (req, res) => {
  try {
    const nickname = req.body.nickname;
    console.log(nickname);
    const dashboardData = await DashboardCTRL.populateDashboard(nickname);

    res.status(200).json({
      message: "Success! Dashboard data retrieved.",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error Dashboard", error);
    res.status(500).json({ error: error.message });
  }
});