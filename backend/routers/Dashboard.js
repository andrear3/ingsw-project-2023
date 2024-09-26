import express from "express";
import { DashboardCTRL } from "../controllers/DashboardCTRL.js";
import { authToken } from "../middleware/Auth.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";

export const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard", authToken, async (req, res) => {
  try {
    const nickname = req.body.nickname;
    console.log("Nickname:", nickname);
    
    const dashboardData = await DashboardCTRL.populateDashboard(nickname);
    console.log("Dashboard Data:", dashboardData);

    if (!Array.isArray(dashboardData) || dashboardData.length === 0) {
      return res.status(404).json({ message: "Nessuna asta trovata" });
    }

    const idAste = dashboardData.map((item) => item.dataValues.astaID);

    const offerteMassime = await OffertaCTRL.trovaOffertaMassima(idAste);
    const timeLeftForAste = await AstaCTRL.getTimeLeftForAsteByIds(idAste);

    const mappaOfferteMassime = offerteMassime.reduce((map, offerta) => {
      map[offerta.AstumAstaID] = offerta.offertaMax;
      return map;
    }, {});

    const mappaTimeLeft = timeLeftForAste.reduce((map, timeLeft) => {
      map[timeLeft.id] = timeLeft.timeLeft;
      return map;
    }, {});

    const datiConOfferteETempo = dashboardData.map((asta) => ({
      ...asta.toJSON(),
      offertaMax: mappaOfferteMassime[asta.dataValues.astaID] || null,
      timeLeft: mappaTimeLeft[asta.dataValues.astaID] || null,
    }));

    res.json({ data: datiConOfferteETempo });
  } catch (error) {
    console.error("Error Dashboard:", error);
    res.status(500).json({ error: error.message });
  }
});
