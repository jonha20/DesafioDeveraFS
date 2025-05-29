const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");
const { createUser } = require("../models/users.models"); // Importar la función createUser

async function register(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "No se recibió body en la petición" });
  }
  const { name, email, password, logged = false } = req.body;
  try {
    const newUser = await createUser(name, email, password, logged);
    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    if (error.code === "23505") {
      // Código de error para violación de unicidad (email ya existe)
      return res.status(409).json({ message: "El email ya está en uso" });
    }
    res.status(500).send("Error en el registro");
  }
}

async function login(req, res) {
  let client;
  try {
    const { email, password } = req.body;

    // Buscar usuario
    client = await pool.connect();
    const result = await client.query(queries.getUserByEmail, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Actualizar estado de login
    await client.query("UPDATE users SET logged = true WHERE id = $1", [
      user.id,
    ]);
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    logged: user.logged,
    name: user.name,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

const refreshToken = jwt.sign(
  {
    id: user.id,
    email: user.email,
    name: user.name,
  },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: "7d" }
);

    res.status(200).set("Authorization", `Bearer ${token}`);

    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https"; // Verifica si la conexión es segura (HTTPS)
    const sameSite = isSecure ? "none" : "lax"; // "lax" para desarrollo, "none" para producción con HTTPS

    const isProduction = process.env.NODE_ENV === "production";

    res
  .cookie("access_token", token, {
        httpOnly: false,
        secure: isProduction, // true en prod (HTTPS), false en dev (HTTP)
        sameSite: isProduction ? "none" : "lax", // none para prod, lax para dev
        maxAge: 3600000,
        domain: isProduction ? "ringtomic.onrender.com" : undefined, // solo en prod
      })
  .cookie("refresh_token", refreshToken, {
  httpOnly: false,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  domain: isProduction ? "ringtomic.onrender.com" : undefined,
})
  .status(200)
  .json({ token: token, msg: "Login correcto" })
  .send();
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión" });
  } finally {
    if (client) client.release();
  }
}

async function logout(req, res) {
  let client;
  try {
    const token = req.cookies.access_token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await pool.query("UPDATE users SET logged = false WHERE id = $1", [
        decoded.id,
      ]);
    }

    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https"; // Verifica si la conexión es segura (HTTPS)
    const sameSite = isSecure ? "none" : "lax"; // "lax" para desarrollo, "none" para producción con HTTPS

    res.clearCookie("access_token", {
      httpOnly: true, // igual que en login
      sameSite: sameSite,
      secure: isSecure,
      path: "/",
    });
    res.status(200).json({
      message: "Cierre de sesión exitoso",
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el logout" });
  } finally {
    if (client) client.release();
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email, name: payload.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token inválido" });
  }
}

module.exports = { register, login, logout, refreshToken };
