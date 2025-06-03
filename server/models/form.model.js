const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");
/*
const insertForm = async (params) => {
    const { formData } = params;
     let client, result;
    try{
client = await pool.connect();

        const {
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
            proyectossociales = "",
            otrainfo = "",
            certificados = "",
            id_user
          } = formData;

         await pool.query();

         await client.query(queries.beginForm);

         await client.query(queries.insertBrand, [company_name]);

          const { rows } = await client.query(
            queries.insertFormData,
            [
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
            ]
          );
        result = rows[0];

        await client.query(queries.assignBrandToUser, [id_brand, id_user]);
        await client.query(queries.commitForm);

        console.log("Formulario insertado correctamente en la BBDD:", result);
        return result;

    
        // console.log("Valores insertados en la BBDD: ", values)
        // const result = await pool.query(queries.insertForm, values)
        // console.log("Resultado de insert: ", result.rows)
        // return result.rows[0];
    } catch (error){
        console.error("Error al insertar formulario en la BBDD", error)
        throw error;
    }finally {
        if (client) {
            client.release();
        }
    }
   
}*/

async function insertForm(params) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insertar en brand si no existe
    await client.query(
      `INSERT INTO brand (name_brand) VALUES ($1) ON CONFLICT (name_brand) DO NOTHING;`,
      [params.name_brand]
    );

    // 2. Obtener id_brand
    const { rows } = await client.query(
      `SELECT id_brand FROM brand WHERE name_brand = $1;`,
      [params.name_brand]
    );
    const id_brand = rows[0].id_brand;

    // 3. Insertar en form
    const formResult = await client.query(
      `INSERT INTO form (
        id_brand, company_name, employees, sustainability_report, percent_renewable_sources,
        plan_carbon_footprint, percent_virgin_material, distance_providers, news_sustainability,
        equality_plan, wage_gap, conciliation_measures, enps_measurement, proyectossociales,
        otrainfo, certificados
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
      ) RETURNING *;`,
      [id_brand, params.company_name, params.employees, params.sustainability_report, params.percent_renewable_sources,
        params.plan_carbon_footprint, params.percent_virgin_material, params.distance_providers, params.news_sustainability,
        params.equality_plan, params.wage_gap, params.conciliation_measures, params.enps_measurement, params.proyectossociales,
        params.otrainfo, params.certificados]
    );

    // 4. Asignar id_brand al usuario
    await client.query(
      `UPDATE users SET id_brand = $1 WHERE id = $2;`,
      [id_brand, params.user_id]
    );

    await client.query('COMMIT');
    return formResult.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
    insertForm,
}