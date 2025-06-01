const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");

const insertForm = async (formData) => {
    let client;
    try{
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
          } = formData;
    
        const values = [
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
        ];
    
        console.log("Valores insertados en la BBDD: ", values)
        const result = await pool.query(queries.insertForm, values)
        console.log("Resultado de insert: ", result.rows)
        return result.rows[0];
    } catch (error){
        console.error("Error al insertar formulario en la BBDD", error)
        throw error;
    }
   
}

module.exports = {
    insertForm,
}