import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  return (
    <div className="information-container">
      
      <div className="card">
        <div className="card-header">
          <h3>
            <span>{t("InformacionPage.InformacionAportada")}</span>
            <img src="/icons/edit-3.svg" alt="edit" className="icon-edit" />
          </h3>
        </div>
        <p>{t("InformacionPage.TextoAportado")}</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>
            <span>{t("InformacionPage.CuestionarioEmpresa")}</span>
            <img src="/icons/check_circle.svg" alt="check" className="icon-check" />
          </h3>
        </div>
        <p>{t("InformacionPage.TextoCuestionario")}</p>

        <div className="buttons">
          <button className="btn-black">{t("InformacionPage.InformarCambios")}</button>
          <button className="btn-white" onClick={() => navigation("/form")}>
            <img src="/icons/file_save.svg" alt="icon" className="icon-download" />
            {t("InformacionPage.RealizarFormulario")}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Information;