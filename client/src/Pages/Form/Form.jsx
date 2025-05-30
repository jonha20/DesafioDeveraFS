import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    empleados: "",
    certificados: "",
    memoria: "",
    energia: "",
    carbono: "",
    materiaVirgen: "",
    proveedores: "",
    proyectosSociales: "",
    criticas: "",
    igualdad: "",
    brechaSalarial: "",
    conciliacion: "",
    enps: "",
    otraInfo: "",
  });

  const [errors, setErrors] = useState({});

  const requiredFields = [
    "empresa",
    "empleados",
    "memoria",
    "energia",
    "carbono",
    "materiaVirgen",
    "proveedores",
    "criticas",
    "igualdad",
    "brechaSalarial",
    "conciliacion",
    "enps",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Seleccione una opción";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Datos enviados:", formData);
      alert("Formulario enviado correctamente (simulado).");
    }
  };

  const renderRadioGroup = (name, label, options) => (
    <fieldset className="radio-group">
      <legend className="question-label">{label} *</legend>
      {options.map((opt, index) => (
        <label
          key={opt}
          className={`radio-card ${formData[name] === opt ? "selected" : ""}`}
        >
          <span className="option-label">{String.fromCharCode(65 + index)}</span>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={formData[name] === opt}
            onChange={handleChange}
          />
          {opt}
        </label>
      ))}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </fieldset>
  );

  return (
    <form className="devera-form" onSubmit={handleSubmit} noValidate>
      <img src="src/assets/images/logo-devera.png" className="logo-devera" alt="Logo Devera" />
      <h2>Devera: Información empresa</h2>
      <p className="intro-text">
        Contesta este cuestionario para que podamos evaluar las políticas de sostenibilidad de tu empresa.
        En base a la información aportada y a la huella de carbono que detectamos automáticamente,
        podremos asignar un score de sostenibilidad a tus productos.
      </p>
      <hr />

      <div>
        <label className="question-label">Nombre de tu empresa *</label>
        <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required/>
        {errors.empresa && <span className="error">{errors.empresa}</span>}
      </div>

      <div>
        <label className="question-label">¿Cuántos empleados tiene la empresa? *</label>
        <input type="text" name="empleados" value={formData.empleados} onChange={handleChange} required/>
        {errors.empleados && <span className="error">{errors.empleados}</span>}
      </div>

      <div>
        <label className="question-label">¿Tiene tu empresa algún certificado? ¿Cuál?</label>
        <p>Indica todos los certificados que tiene tu empresa y los de los productos que comercializas, así como de transparencia de la cadena de suministro (Bcorp, Fair Trade, ISO14001, Cradle to Cradle, FSC, etc.) </p>
        <textarea name="certificados" value={formData.certificados} onChange={handleChange}></textarea>
      </div>

      {renderRadioGroup("memoria", "¿Tiene tu empresa memoria de sostenibilidad?", ["Si", "No"])}
      {renderRadioGroup(
        "energia",
        "¿En qué porcentaje la energía de tu empresa y tus fábricas proviene de fuentes renovables?",
        ["0%", "Menos del 25%", "Entre un 25 y un 50%", "Entre un 50 y un 75%", "Entre un 75 y un 99%", "100%", "No lo sé"]
      )}
      {renderRadioGroup(
        "carbono",
        "¿Se miden las emisiones de carbono en la empresa o se tiene un plan para reducir la huella de carbono?",
        [
          "Se están midiendo y hay un plan de reducción",
          "Se están midiendo pero no hay plan de reducción",
          "Se está en proceso de medición",
          "No hay plan de medición",
          "Otro",
        ]
      )}
      {renderRadioGroup(
        "materiaVirgen",
        "¿Qué porcentaje de materia virgen no renovable usan vuestros productos de media?",
        ["0%", "Menos del 25%", "Entre un 25 y un 50%", "Entre un 50 y un 75%", "Entre un 75 y un 99%", "100%", "No lo sé"]
      )}
      {renderRadioGroup(
        "proveedores",
        "¿Qué porcentaje de vuestros proveedores se encuentra a una distancia inferior a 400 km?",
        ["0%", "Menos del 25%", "Entre un 25 y un 50%", "Entre un 50 y un 75%", "Entre un 75 y un 99%", "100%", "No lo sé"]
      )}

      <div>
        <label className="question-label">¿Realizáis o apoyáis proyectos sociales?</label>
        <textarea name="proyectosSociales" value={formData.proyectosSociales} onChange={handleChange}></textarea>
      </div>

      {renderRadioGroup("criticas", "¿Existen noticias públicas criticando aspectos de sostenibilidad de vuestra empresa?", ["Si", "No", "No lo sé"])}
      {renderRadioGroup("igualdad", "¿Existe un plan de igualdad implementado?", ["Si", "No", "No lo sé"])}
      {renderRadioGroup("brechaSalarial", "¿Medís la brecha salarial por género?", ["Si", "No", "No lo sé"])}
      {renderRadioGroup("conciliacion", "¿Tenéis medidas de conciliación publicadas?", ["Si", "No", "No lo sé"])}
      {renderRadioGroup("enps", "¿Medís el eNPS (satisfacción del empleado)?", ["Si", "No", "No lo sé"])}

      <div>
        <label className="question-label">¿Hay alguna otra información relevante?</label>
        <textarea name="otraInfo" value={formData.otraInfo} onChange={handleChange}></textarea>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;


