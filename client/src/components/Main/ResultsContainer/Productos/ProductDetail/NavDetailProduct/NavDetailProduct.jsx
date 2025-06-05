import React from "react";
import { useTranslation } from "react-i18next";

const NavDetailProduct = ({ setActiveTab, activeTab }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="navbar-detail-product">
        <button
          className={`navbar-item ${activeTab === "resumen" ? "active" : ""}`}
          onClick={() => setActiveTab("resumen")}
        >
          {t("NavDetailProduct.Resumen")}
        </button>
        <button
          className={`navbar-item ${activeTab === "conclusiones" ? "active" : ""}`}
          onClick={() => setActiveTab("conclusiones")}
        >
          {t("NavDetailProduct.Conclusiones")}
        </button>
        <button
          className={`navbar-item ${activeTab === "detalle_categorias" ? "active" : ""}`}
          onClick={() => setActiveTab("detalle_categorias")}
        >
          {t("NavDetailProduct.DetallesCategoria")}
        </button>
        <button
          className={`navbar-item ${activeTab === "comparativa" ? "active" : ""}`}
          onClick={() => setActiveTab("comparativa")}
        >
          {t("NavDetailProduct.Comparativa")}
        </button>
        <button
          className={`navbar-item ${activeTab === "sostenibilidad_marca" ? "active" : ""}`}
          onClick={() => setActiveTab("sostenibilidad_marca")}
        >
          {t("NavDetailProduct.SostenibilidadDeLaMarca")}
        </button>
        <button
          className={`navbar-item ${activeTab === "informacion_marketing" ? "active" : ""}`}
          onClick={() => setActiveTab("informacion_marketing")}
        >
          {t("NavDetailProduct.InformacionMarketing")}
        </button>
      </div>
      <div className="navbar-underline"></div>
    </>
  );
};

export default NavDetailProduct;