import express from "express";
import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { homepageRouter } from "./routers/Homepage.js";

const app = express();

const PORT = 3000;


UtenteCTRL.stampaTuttiUtenti();

const checkValue = async () => {
  try {
    console.log('Checking value...');
 
  } catch (error) {
    console.error('Error checking value:', error);
  }
};


setInterval(checkValue, 6000);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(homepageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
