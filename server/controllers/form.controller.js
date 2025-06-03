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
        // Obtener el id del usuario autenticado
        const id_user = req.user?.id;
        // if (!id_user) {
        //     return res.status(401).json({ error: "Usuario sin autenticación" });
        // }

        // Validar campos obligatorios
        const missingFields = requiredFields.filter(
            field => req.body[field] === undefined || req.body[field] === ""
        );
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Rellena todos los campos obligatorios",
                missingFields
            });
        }

        // Preparar datos para el modelo
       const formData = {
    ...req.body,
    name_brand: req.body.company_name, // <-- Asegúrate de esto
    company_name: req.body.company_name,
    proyectossociales: req.body.proyectossociales || "",
    otrainfo: req.body.otrainfo || "",
    certificados: req.body.certificados || ""
};

        // Insertar en la BBDD usando el modelo
        await formModel.insertForm(formData, id_user);

        res.status(201).json({ message: "Formulario enviado con éxito" });
    } catch (error) {
        console.error("Error al guardar el formulario: ", error);
        res.status(500).json({ error: "Error en el servidor al guardar el formulario" });
    }
};

module.exports = {
    createForm
}