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
  beginForm:
  `BEGIN;`,

  insertBrand: 
  `INSERT INTO brand (name_brand) VALUES ($1) ON CONFLICT (name_brand) DO NOTHING;`,

  getBrandId:
 `SELECT id_brand FROM brand WHERE name_brand = $1;`,
  insertFormData: `
INSERT INTO form (
        id_brand, company_name, employees, sustainability_report, percent_renewable_sources,
        plan_carbon_footprint, percent_virgin_material, distance_providers, news_sustainability,
        equality_plan, wage_gap, conciliation_measures, enps_measurement, proyectossociales,
        otrainfo, certificados
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
      ) RETURNING *;`,

  assignBrandToUser: `
UPDATE users SET id_brand = $1 WHERE id = $2;`,

  commitForm: `
COMMIT;`,

  insertForm: `
  BEGIN;

-- 1. Insertar en brand si no existe
INSERT INTO brand (name_brand)
VALUES ($1)
ON CONFLICT (name_brand) DO NOTHING;

-- 2. Obtener el id_brand correspondiente
WITH brand_info AS (
  SELECT id_brand FROM brand WHERE name_brand = $1
)

-- 3. Insertar en form
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
  enps_measurement,
  proyectossociales,
  otrainfo,
  certificados
)
SELECT 
  id_brand, $2, $3, $4, $5, $6, $7,
  $8, $9, $10, $11, $12, $13, $14, $15, $16
FROM brand_info
RETURNING *;

-- 4. Asignar el id_brand al usuario
UPDATE users
SET id_brand = (SELECT id_brand FROM brand WHERE name_brand = $1)
WHERE id = $17;

COMMIT;


  `,

  // PRODUCTS
  createProduct: `
  WITH new_product AS (
    INSERT INTO products (product_name, href, id_brand, product_folder)
    VALUES ($1, $2, $3, $4)
    RETURNING id_products
  )
  INSERT INTO products_impacts_resume (id_products)
  VALUES ((SELECT id_products FROM new_product))
  RETURNING *;
`,

  //RECOVER / RESET PASSWORD
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  updateUserPassword: `UPDATE users SET password=$1 WHERE email=$2;`,
};

module.exports = queries;
