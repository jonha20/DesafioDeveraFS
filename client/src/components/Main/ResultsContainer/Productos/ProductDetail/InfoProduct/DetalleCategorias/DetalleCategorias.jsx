import React from "react";
import { useTranslation } from "react-i18next";

const DetalleCategorias = ({ jsonData }) => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <article>
          <div className="materias-primas-header">
            <h2>{t("DetallesCategoria.MateriasPrimas")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="materias-primas-content">
            <p>{jsonData.stage_analysis.raw_materials}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>{t("DetallesCategoria.Fabricacion")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="fabricacion-content">
            <p>{jsonData.stage_analysis.Manufacturing}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>{t("DetallesCategoria.Transporte")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="transporte-content">
            <p>{jsonData.stage_analysis.Transport}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
           <h2>{t("DetallesCategoria.Emabalaje")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
           <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="emabalaje-content">
            <p>{jsonData.stage_analysis.Packaging}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>{t("DetallesCategoria.Uso")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="uso-content">
            <p>{jsonData.stage_analysis["Use Phase"]}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>{t("DetallesCategoria.FinDeVida")}</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            <p>{jsonData.products_impacts_resume.co2_fingerprint} kg/CO₂</p>
          </div>
          <div className="fin-de-vida-content">
            <p>{jsonData.stage_analysis["End of Life"]}</p>
          </div>
        </article>

      </section>
    </>
  );
};

export default DetalleCategorias;
