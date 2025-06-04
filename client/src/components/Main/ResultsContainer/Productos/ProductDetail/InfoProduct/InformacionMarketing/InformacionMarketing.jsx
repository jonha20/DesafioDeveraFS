import React from "react";
import { useTranslation } from "react-i18next";

const InformacionMarketing = ({ productData, jsonData }) => {
  const { t } = useTranslation();

  // Datos desde props reales
  const impact_score = productData?.impact_score ?? 0;
  const seal = productData?.seal || "-";
  const co2 = productData?.co2_firgerprint ?? "-";
  const pct_benchmark = productData?.pct_benchmark ?? "-";

  // Datos desde el JSON mockeado
  const product = jsonData?.products || {};

  return (
    <section className="marketing-info">
      <div className="marketing-info__content">
        {/* Columna izquierda */}
        <div className="marketing-info__column-left">
          <article className="marketing-info__intro">
            <h2>{t("InformacionMarketing.PotenciaTitulo")}</h2>
            <p>{t("InformacionMarketing.PotenciaTexto")}</p>
          </article>

          <article className="marketing-info__especial">
            <h3>{t("InformacionMarketing.TituloResumenImpacto")}</h3>
            <ul>
              <li>
                <strong>{t("InformacionMarketing.TotalWeight")}:</strong>{" "}
                {product.total_weight ?? "-"} g
              </li>
              <li>
                <strong>{t("InformacionMarketing.Reciclado")}:</strong>{" "}
                {product.pct_recycling ?? "-"}%
              </li>
              <li>
                <strong>{t("InformacionMarketing.Transporte")}:</strong>{" "}
                {product.transporting_type ?? "-"} -{" "}
                {product.transporting_distance ?? "-"} km
              </li>
            </ul>
          </article>
        </div>

        {/* Columna derecha (datos reales por props) */}
        <aside className="marketing-info__sidebar">
          <div className="impact-score">
            <span className="impact-score__label">{t("IMPACT SCORE")}</span>
            <div className="impact-score__bar-wrapper">
              <div
                className="impact-score__seal-wrapper"
                style={{ left: `calc(${impact_score}% - 12px)` }}
              >
                <span className="impact-score__seal">{seal}</span>
              </div>
            </div>
            <span className="impact-score__value">{impact_score}/100</span>
          </div>

          <div className="marketing-info__metrics">
            <div>
              <strong>{t("Huella de carbono del producto")}:</strong> {co2} kg CO₂
            </div>
            <div>
              <strong>{t("Puntuación de sostenibilidad")}:</strong> {pct_benchmark}%
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default InformacionMarketing;



