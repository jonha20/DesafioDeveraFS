import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

const Conclusiones = ({ jsonData }) => {
  const { t } = useTranslation();

  if (!jsonData?.products_conclusions) return <p>{t("conclusions.loading")}</p>;

  const { general_summary, strong_points, areas_for_improvement } = jsonData.products_conclusions;

  return (
    <section>
      {/* Resumen General */}
      <article>
        <div className="materias-primas-header">
          <h2>{t("conclusions.general_summary_title")}</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <p>{general_summary}</p>
        </div>
      </article>

      {/* Puntos Fuertes */}
      <article>
        <div className="materias-primas-header">
          <h2>{t("conclusions.strong_points_title")}</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <ul>
            {strong_points.map((point) => (
              <li key={uuidv4()}>{point}</li>
            ))}
          </ul>
        </div>
      </article>

      {/* Áreas de Mejora */}
      <article>
        <div className="materias-primas-header">
          <h2>{t("conclusions.improvement_areas_title")}</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <ul>
            {areas_for_improvement.map((area) => (
              <li key={uuidv4()}>{area}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default Conclusiones;
