const queries = {
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, password, logged)
            VALUES ($1,$2,$3,$4);`,
};

module.exports = queries;
