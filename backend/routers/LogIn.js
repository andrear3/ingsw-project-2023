import express from "express";
import { Utente } from "../models/Database.js";
import { createHash } from 'crypto';

export const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
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
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log('Login successful:', user);
            res.json(user);
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

loginRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).send("Logged out successfully");
    });
});
