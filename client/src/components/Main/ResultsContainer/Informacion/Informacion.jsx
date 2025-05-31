
import React from "react";
import { useTranslation } from "react-i18next";
import '../../../../styles/components/_Informacion.scss';

const Informacion = () => {
  const { t } = useTranslation();

  return (
    <div className="informacion-container">
      
      <div className="bloque">
        <div className="bloque-header">
          <h3>{t("InformacionPage.InformacionAportada")}</h3>
          <span className="icono-editar"></span>
        </div>
        <p>{t("InformacionPage.TextoAportado")}</p> 
      </div>

      <div className="bloque">
        <div className="bloque-header">
          <h3>{t("InformacionPage.CuestionarioEmpresa")}</h3>
          <span className="icono-check"></span>
        </div>
        <p>{t("InformacionPage.TextoCuestionario")}</p>

        <div className="botones">
          <button className="btn-negro">{t("InformacionPage.InformarCambios")}</button>
          <button className="btn-blanco">
            <img src="/icons/download-icon.png" alt="icono" className="icono-descargar" />
            {t("InformacionPage.RealizarFormulario")}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Informacion;