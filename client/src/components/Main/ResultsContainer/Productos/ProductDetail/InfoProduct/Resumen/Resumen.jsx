import React from "react";
import "../../../../../../../styles/components/_Resumen.scss";
import { useTranslation } from "react-i18next";


const Resumen = ({ jsonData }) => {
  const { t } = useTranslation();

  if (!jsonData || jsonData.length === 0) {
    return <p>{t("CargandoDatos", "Cargando datos...")}</p>;
  }

  const totalCarbon = jsonData.products_impacts_resume.co2_fingerprint;
  const rawMaterials = jsonData.products_impacts.raw_materials;
  const manufacturing = jsonData.products_impacts.manufacturing;
  const transport = jsonData.products_impacts.transport;
  const packaging = jsonData.products_impacts.packaging;
  const productUse = jsonData.products_impacts.product_use;
  const endOfLife = jsonData.products_impacts.end_of_life;
  const impactScore = jsonData.products_impacts_resume.impact_score;
  const seal = jsonData.products_impacts_resume.seal;
  const differencePercentage = jsonData.products_impacts_resume.pct_benchmark;
  const avgProduct = jsonData.products_impacts_resume.benchmark_value;
  const productScore = jsonData.products_impacts_resume.product_score;
  const brandScore = jsonData.products_impacts_resume.brand_score;

  return (
    <div className="summary-container">
      <div className="carbon-section">
        <div className="carbon-header">
          <h2>{t("ResumenPage.HuellaCarbono")}</h2>
          <div className="carbon-data">
            <span className="arrow">
              <img src="/icons/arrow_circle_right.svg" alt="Flecha" />
            </span>
            <span className="value">{totalCarbon}</span>
            <span className="unit">kg CO₂ eq</span>
            <span className="icon-co2">
              <img src="/icons/CO2.png" alt="Nube CO₂" />
            </span>
          </div>
        </div>

        <div className="carbon-breakdown">
          <div className="item">
            <p>{t("ResumenPage.MateriaPrima")}</p>
            <span>{rawMaterials} kg CO₂ eq</span>
          </div>
          <div className="item">
            <p>{t("ResumenPage.Fabricacion")}</p>
            <span>{manufacturing} kg CO₂ eq</span>
          </div>
          <div className="item">
            <p>{t("ResumenPage.Transporte")}</p>
            <span>{transport} kg CO₂ eq</span>
          </div>
          <div className="item">
            <p>{t("ResumenPage.Embalaje")}</p>
            <span>{packaging} kg CO₂ eq</span>
          </div>
          <div className="item">
            <p>{t("ResumenPage.Uso")}</p>
            <span>{productUse} kg CO₂ eq</span>
          </div>
          <div className="item">
            <p>{t("ResumenPage.FinVida")}</p>
            <span>{endOfLife} kg CO₂ eq</span>
          </div>
        </div>
      </div>

      <div className="benchmark-section">
        <div className="benchmark-header">
          <h3>{t("ResumenPage.DiferenciaHuella")}</h3>
          <div className="benchmark-data">
            <span className="arrow">
              <img src="/icons/arrow_circle_right.svg" alt="Flecha" />
            </span>
            <span className="value">{differencePercentage}%</span>
            <span className="icon-benchmark">
              <img src="/icons/hand-leaf.png" alt="Icono benchmark" />
            </span>
          </div>
        </div>
        <div className="benchmark-values">
          <div className="benchmark-average">
            <span className="average-icon">
              <img src="/icons/podium.svg" alt="Icono media" />
            </span>
            <span><strong>0,40</strong></span>
            <span className="average-value">{avgProduct} kg CO₂ eq</span>
            <span className="average-text">
              {t("ResumenPage.HuellaMediaProducto")}
            </span>
          </div>
        </div>
      </div>

      <div className="sustainability-section">
        <div className="sustainability-header">
          <h3>{t("ResumenPage.PuntuacionSostenibilidad")}</h3>
          <div className="sustainability-data">
            <span className="arrow">
              <img src="/icons/arrow_circle_right.svg" alt="Flecha" />
            </span>
            <span className="value">{impactScore}/100</span>
            <span className="icon-sustainability">
              <img src="/icons/leaf-point.jpg" alt="Score-Icon" />
            </span>
          </div>
        </div>

        <div className="sustainability-values">
          <div className="sustainability-item">
            <span className="item-icon">
              <img src="/icons/CO2-market.png" alt="Icono mercado" />
            </span>
            <span><strong>6</strong></span>
            <span className="item-scale">/10</span>
            <span className="item-text">{t("ResumenPage.HuellaProductoMercado")}</span>
          </div>

          <div className="sustainability-item">
            <span className="item-icon">
              <img src="/icons/leaf-mark.png" alt="Icono marca" />
            </span>
            <span><strong>4</strong></span>
            <span className="item-scale">/10</span>
            <span className="item-text">{t("ResumenPage.SostenibilidadMarca")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumen;