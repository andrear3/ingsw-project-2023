const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password } = req.body;
    await db.Utente.create({ nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'User registration failed' });
  }
});

module.exports = router;