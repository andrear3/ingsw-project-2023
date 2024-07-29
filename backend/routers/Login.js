import express from "express";
import { Utente } from "../models/Database.js";

export const loginRouter = new express.Router();

loginRouter.post("/login", async (req, res) => {
  const { user, pass } = req.body;

  // Here you would handle authentication, e.g., check the user and pass
  console.log(`Username: ${user}`);
  console.log(`Password: ${pass}`);

  // Mock authentication process
  if (user === "testuser" && pass === "testpass") {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

loginRouter.get("/login", async (req, res) => {
  console.log("Login test");
  res.send("GET request to /login received");
});
