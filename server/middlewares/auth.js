const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
  const tokenFromCookie = req.cookies.access_token;
  const authHeader = req.headers.authorization;
  let token = tokenFromCookie;

  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; //Extraer token del header
  }

  if (!token) {
    return res.status(401).json({ message: "No autorizado: token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

module.exports = authenticate;