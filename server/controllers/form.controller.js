const formModel = require("../models/form.model")

const requiredFields = [
    "company_name",
    "employees",
    "sustainability_report",
    "percent_renewable_sources",
    "plan_carbon_footprint",
    "percent_virgin_material",
    "distance_providers",
    "news_sustainability",
    "equality_plan",
    "wage_gap",
    "conciliation_measures",
    "enps_measurement"
]

const createForm = async (req, res) => {
    try {

        //Obtener el id_brand del usuario autenticado
        const id_brand = req.user?.id_brand;

        /*if(!id_brand){
            return res.status(401).json({ error: "Usuario sin autenticación" })
        }*/

        //Unir datos del formulario con el id_brand
        const formData = {
            id_brand,
            ...req.body,
        }

        //Validación de los campos obligatorios del formulario
        const missingFields = requiredFields.filter(field => formData[field] === undefined || formData[field] === "");

        if(missingFields.length > 0){
            return res.status(400).json({
                error: "Rellena todos los campos obligatorios",
                missingFields
            })
        }

        //Insertar en la BBDD
        await formModel.insertForm(formData);
        res.status(201).json({ message: "Formulario enviado con éxito"})
    } catch(error){
        console.error("Error al guardar el formulario: ", error)
        res.status(500).json({ error: "Error en el servidor al guardar el formulario"})
    }
}

module.exports = {
    createForm
}