const pool = require("../config/sqlConfig");
const bcrypt = require("bcrypt");
const queries = require("../utils/queries"); // Queries SQL

async function createUser(
  name,
  email,
  password,
  logged = false
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [ name,email, hashedPassword, logged];

  const result = await pool.query(queries.createUser, values);
  return result.rows[0];
}

const recoverPassword = async (email) => {
  const userResult = await pool.query(queries.getUserByEmail, [email]);
  if (userResult.rows.length === 0) {
    return null; // o lanzar un error, o devolver undefined
  }

  const token = jwt.sign({ id: userResult.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Aquí no deberías actualizar contraseña con el token, me parece un error
  // Mejor deberías guardar el token en otra tabla o enviar email

  return { token, userId: userResult.rows[0].id };
};


const restorePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(queries.updateUserPassword, [hashedPassword, userId]);

    res.json({ msg: "Contraseña actualizada con éxito" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al actualizar la contraseña" });
  }
};


module.exports = { 
  createUser,
  recoverPassword,
  restorePassword
 };
