import express from "express";
import jwt from "jsonwebtoken";
import { Utente } from "../models/Database.js";
import { createHash } from "crypto";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Utente.findOne({ where: { email } });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    const hashedPassword = createHash("sha256").update(password).digest("hex");
    if (hashedPassword !== user.password) {
      console.log("Login failed: Incorrect password");
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const loginUser = {
      email: email,
      password: password,
    };


    const accessToken = jwt.sign(loginUser, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
    console.log(accessToken);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});
