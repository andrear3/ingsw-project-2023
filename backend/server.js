import express from "express";
import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { homepageRouter } from "./routers/Homepage.js";
import { registrationRouter } from "./routers/Registration.js";

import { OffertaCTRL } from "./controllers/OffertaCTRL.js";
import session from 'express-session';
import cors from 'cors'; // Aggiungi questa importazione
import { createHash } from 'crypto';

//login chatgpt


//imports per immagini
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

//temp
import bodyParser from "body-parser";



//usato per mandare immagini
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

//MIDDLEWARE PER PARSING BODY DEL CLIENT.
app.use(express.json());

//temp
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

 
const PORT = 3000;

// Configura il middleware CORS//cahtgpt
app.use(cors({
  origin: 'http://localhost:4200', // Sostituisci con l'URL del tuo front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Se usi cookie di sessione
}));


UtenteCTRL.stampaTuttiUtenti();


/* FUNZIONE PER ASTA TIMER : >>>>
const checkValue = async () => {
  try {
    console.log('Checking value...');
 
  } catch (error) {
    console.error('Error checking value:', error);
  }
};


setInterval(checkValue, 6000);
*/

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//test per mandare user a db


app.get('/test', (req, res) => {
  //res.sendFile(__dirname + '/gameboy.jpg');
  res.sendFile(path.join(__dirname, '.', 'resources', 'images', 'gameboy.jpg'));
});

app.use(homepageRouter);
app.use(registrationRouter);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//login chatgpt 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Middleware per controllare se l'utente è autenticato
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
}

app.post('/register', async (req, res) => {
  const { nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password } = req.body;
  try {
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    const user = await Utente.create({ nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//login 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Utente.findOne({ where: { email } });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    if (hashedPassword !== user.password) {
      console.log('Login failed: Incorrect password');
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    req.session.user = user;
    console.log('Login successful:', user);
    res.json(user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send("Logged out successfully");
  });
});

app.get('/user', isAuthenticated, (req, res) => {
  res.json(req.session.user);
});

