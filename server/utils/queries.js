const queries = {

  // USERS

  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, password, logged)
            VALUES ($1,$2,$3,$4);`,

  // PRODUCTS
  getAllProducts: `SELECT p2.product_name, p1.* FROM public.products_impacts_resume p1
inner join products p2 on p2.id_products = p1.id_products;`,

  //FORM
  insertForm: `
  INSERT INTO form (
  id_brand,
  company_name,
  employees,
  sustainability_report,
  percent_renewable_sources,
  plan_carbon_footprint,
  percent_virgin_material,
  distance_providers,
  news_sustainability,
  equality_plan,
  wage_gap,
  conciliation_measures,
  enps_measurement
  ) VALUES (
  $1, $2, $3, $4, $5, $6, $7,
  $8, $9, $10, $11, $12, $13
  )
  RETURNING *;
  `
};

module.exports = queries;
