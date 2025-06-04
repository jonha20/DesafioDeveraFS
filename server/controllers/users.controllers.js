const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");
const saltRounds = 10;
const { createUser, recoverPassword, restorePassword } = require("../models/users.models"); // Importar la función createUser

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

// async function login(req, res) {
//   let client;
//   try {
//     const { email, password } = req.body;

//     // Buscar usuario
//     client = await pool.connect();
//     const result = await client.query(queries.getUserByEmail, [email]);
//     const user = result.rows[0];

//     if (!user) {
//       return res.status(401).json({ message: "Usuario no encontrado" });
//     }

//     // Verificar contraseña
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Credenciales inválidas" });
//     }

//     // Actualizar estado de login
//     await client.query("UPDATE users SET logged = true WHERE id = $1", [
//       user.id,
//     ]);
// const token = jwt.sign(
//   {
//     id: user.id,
//     email: user.email,
//     logged: user.logged,
//     name: user.name,
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: "1h" }
// );

// const refreshToken = jwt.sign(
//   {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//   },
//   process.env.JWT_REFRESH_SECRET,
//   { expiresIn: "7d" }
// );

//     res.status(200).set("Authorization", `Bearer ${token}`);

//     const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https"; // Verifica si la conexión es segura (HTTPS)
//     const sameSite = isSecure ? "none" : "lax"; // "lax" para desarrollo, "none" para producción con HTTPS

//     const isProduction = process.env.NODE_ENV === "production";

//     res
//   .cookie("access_token", token, {
//         httpOnly: false,
//         secure: isProduction, // true en prod (HTTPS), false en dev (HTTP)
//         sameSite: isProduction ? "none" : "lax", // none para prod, lax para dev
//         maxAge: 3600000,
//         domain: isProduction ? "desafiodeverafs.onrender.com" : undefined, // solo en prod
//       })
//   .cookie("refresh_token", refreshToken, {
//   httpOnly: false,
//   secure: isProduction,
//   sameSite: isProduction ? "none" : "lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
//   domain: isProduction ? "desafiodeverafs.onrender.com" : undefined,
// })
//   .status(200)
//   .json({ token: token, msg: "Login correcto" })
//   .send();
//   } catch (error) {
//     res.status(500).json({ message: "Error en el inicio de sesión" });
//   } finally {
//     if (client) client.release();
//   }
// }

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
        image: user.image_url || null, // Asegúrate de que 'image' sea opcional
        id_brand: user.id_brand,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        logged: user.logged,
        name: user.name,
        image: user.image_url || null, // Asegúrate de que 'image' sea opcional
        id_brand: user.id_brand,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res
      .cookie("access_token", token, {
        httpOnly: false,
        secure: isProduction, // true en producción (Render), false en local
        sameSite: isProduction ? "none" : "lax", // "none" para cross-site, "lax" en local
        maxAge: 3600000,
      })
      .status(200)
      .json({ token, msg: "Login correcto" });
  } catch (error) {
    console.error("Error en login:", error); // <-- Agrega esto
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
      { id: payload.id,
        email: payload.email,
        logged: payload.logged,
        name: payload.name,
        image: payload.image_url || null, // Asegúrate de que 'image' sea opcional
        id_brand: payload.id_brand, },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token inválido" });
  }
}

const handleRecoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica que el usuario exista
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Correo no registrado" });
    }

    // Generar token con vencimiento corto
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Generar enlace
    const link = `http://localhost:5173/reset-password?token=${token}`;

    // Aquí normalmente enviarías el enlace por email, pero por ahora lo devolvemos en JSON también:
    res.status(200).json({
      message: "Revisa tu correo para restablecer la contraseña",
      resetLink: link, // <-- útil para pruebas en frontend también
    });

  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const handleRestorePassword = async (req, res) => {
  const { token, email, newPassword } = req.body;
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    // Validar el token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el email del token coincide con el que envía el usuario
    if (payload.email !== email) {
      return res.status(403).json({ message: "Token no coincide con el email" });
    }

    // Hashear la nueva contraseña y actualizar en DB
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await pool.query(queries.updateUserPassword, [hashedPassword, email]);
    
    res.status(200).json({ message: "Contraseña restablecida con éxito" });

  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


module.exports = { 
 register,
 login, 
 logout, 
 refreshToken,
 handleRecoverPassword,
 handleRestorePassword
 };
