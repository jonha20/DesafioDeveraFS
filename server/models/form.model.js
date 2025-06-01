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
            enps_measurement
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
            enps_measurement
        ];
    
        const result = await pool.query(queries.insertForm, values)
        return result.rows[0];
    } catch (error){
        console.error(error)
    }
   
}

module.exports = {
    insertForm,
}