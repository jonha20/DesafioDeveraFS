import React, { useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { UserContext } from "@/src/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  //Toastify para notificaciones
  const notify = (message, type) => toast[type](message);
  const initialFormData = { //Estado inicial del formulario
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
  }
  const { t } = useTranslation();
  const fieldRefs = useRef({})
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  

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

  const validate = () => { //Validación del formulario
    const newErrors = {};
    let firstErrorKey = null;

    requiredFields.forEach((field) => {
      if (formData[field] === undefined || formData[field] === ""){
        newErrors[field] = t(notify("form.seleccione", "error"));
        if(!firstErrorKey){
          firstErrorKey = field;
        }
      }
    });
    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      firstErrorKey,
    }
  };

  let id_brand = user.id_brand
  const mapFormDataToApi = () => ({
    id_brand: id_brand,
    company_name: formData.empresa,
    employees: formData.empleados,
    sustainability_report: formData.memoria === "Si",
    percent_renewable_sources: formData.energia,
    plan_carbon_footprint: formData.carbono,
    percent_virgin_material: formData.materiaVirgen,
    distance_providers: formData.proveedores,
    news_sustainability: formData.criticas,
    equality_plan: formData.igualdad,
    wage_gap: formData.brechaSalarial,
    conciliation_measures: formData.conciliacion,
    enps_measurement: formData.enps,
    proyectossociales: formData.proyectosSociales,
    otrainfo: formData.otraInfo,
    certificados: formData.certificados
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, firstErrorKey } = validate();

    if (isValid) {
      const dataToSend = mapFormDataToApi();

      //http://localhost:3000/form
      //https://desafiodeverafs.onrender.com/form

      try {
        const response = await axios.post("https://desafiodeverafs.onrender.com/form", dataToSend, {
          withCredentials: true,
        });
        alert(t("form.enviado"));

        setFormData(initialFormData);
        setErrors({});

        setTimeout(() => {
          navigate("/home");
        }, 1000);


      } catch (error) {
        notify(t("form.errorServidor"), "error");
        console.error("Error al enviar el formulario:", error.response?.data || error.message);
        notify(t("form.errorServidor") || "Error al enviar el formulario", "error");
      }
    } else {
      const radioFields = requiredFields;
      if (radioFields.includes(firstErrorKey)) {
        notify(t("form.alertaRadios"), "warning");
      }

      const errorElement = fieldRefs.current[firstErrorKey];
      if (errorElement?.scrollIntoView) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus?.();
      }
    }
  };

  const renderRadioGroup = (name, label, options) => ( //Función para pintar los input de tipo radio
    <fieldset className="radio-group">
      <legend className="question-label">{t(label)} *</legend>
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
            required={index === 0}
            ref={index === 0 ? (el) => (fieldRefs.current[name] = el) : null}
          />
          {t(`form.opciones.${opt}`) || opt}
        </label>
      ))}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </fieldset>
  );

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    <form className="devera-form" onSubmit={handleSubmit} noValidate>
      <img src="/devera_ai_logo.png" className="logo-devera" alt="Logo Devera" />
      <h2>{t("form.titulo")}</h2>
      <p className="intro-text">{t("form.intro")}</p>
      <hr />

      <div>
        <label className="question-label">{t("form.nombreEmpresa")}</label>
        <input 
          type="text" 
          name="empresa" 
          value={formData.empresa} 
          onChange={handleChange} 
          required 
          ref={(el) => (fieldRefs.current["empresa"] = el)}/>
        {errors.empresa && <span className="error">{errors.empresa}</span>}
      </div>

      <div>
        <label className="question-label">{t("form.empleados")}</label>
        <input 
          type="text" 
          name="empleados" 
          value={formData.empleados} 
          onChange={handleChange} 
          required
          ref={(el) => (fieldRefs.current["empleados"] = el)}
          />
        {errors.empleados && <span className="error">{errors.empleados}</span>}
      </div>

      <div>
        <label className="question-label">{t("form.certificados")}</label>
        <p>{t("form.certificadosDescripcion")}</p>
        <textarea name="certificados" value={formData.certificados} onChange={handleChange}></textarea>
      </div>

      {renderRadioGroup("memoria", "form.memoria", ["Si", "No"])}
      {renderRadioGroup("energia", "form.energia", [
        "0%", "Menos25", "25_50", "50_75", "75_99", "100%", "NoLoSe"
      ])}
      {renderRadioGroup("carbono", "form.carbono", [
        "ConPlan", "SinPlan", "Proceso", "SinMedicion", "Otro"
      ])}
      {renderRadioGroup("materiaVirgen", "form.materiaVirgen", [
        "0%", "Menos25", "25_50", "50_75", "75_99", "100%", "NoLoSe"
      ])}
      {renderRadioGroup("proveedores", "form.proveedores", [
        "0%", "Menos25", "25_50", "50_75", "75_99", "100%", "NoLoSe"
      ])}

      <div>
        <label className="question-label">{t("form.proyectosSociales")}</label>
        <textarea name="proyectosSociales" value={formData.proyectosSociales} onChange={handleChange}></textarea>
      </div>

      {renderRadioGroup("criticas", "form.criticas", ["Si", "No", "NoLoSe"])}
      {renderRadioGroup("igualdad", "form.igualdad", ["Si", "No", "NoLoSe"])}
      {renderRadioGroup("brechaSalarial", "form.brechaSalarial", ["Si", "No", "NoLoSe"])}
      {renderRadioGroup("conciliacion", "form.conciliacion", ["Si", "No", "NoLoSe"])}
      {renderRadioGroup("enps", "form.enps", ["Si", "No", "NoLoSe"])}

      <div>
        <label className="question-label">{t("form.otraInfo")}</label>
        <textarea name="otraInfo" value={formData.otraInfo} onChange={handleChange}></textarea>
      </div>

      <button type="submit">{t("form.enviar")}</button>
    </form>
    </>
  );
};

export default Form;


