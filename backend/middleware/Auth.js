import jwt from "jsonwebtoken";

export function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(req);
  console.log(token);
  console.log("agsrga");

  if (token == null) {
    return res.sendStatus(401);
  }

 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
