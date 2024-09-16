import jwt from "jsonwebtoken";

export function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    //req.user attacca l'utente preso da jwt alla richiesta, disponibile ai routers!
    req.user = user;
    
    next();
  });
}
