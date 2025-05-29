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

module.exports = { createUser };
