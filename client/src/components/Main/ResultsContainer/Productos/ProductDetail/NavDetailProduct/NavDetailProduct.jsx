import React from "react";
import { useTranslation } from "react-i18next";

const NavDetailProduct = ({ setActiveTab, activeTab }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="navbar">
        <h2
          className={activeTab === "resumen" ? "active" : ""}
          onClick={() => setActiveTab("resumen")}
        >
          {t("NavDetailProduct.Resumen")}
        </h2>
        <h2
          className={activeTab === "conclusions" ? "active" : ""}
          onClick={() => setActiveTab("conclusions")}
        >
          {t("NavDetailProduct.Conclusiones")}
        </h2>
        <h2
          className={activeTab === "detailsCat" ? "active" : ""}
          onClick={() => setActiveTab("detailsCat")}
        >
          {t("NavDetailProduct.DetallesCategoria")}
        </h2>
        <h2
          className={activeTab === "comparative" ? "active" : ""}
          onClick={() => setActiveTab("comparative")}
        >
          {t("NavDetailProduct.Comparativa")}
        </h2>
        <h2
          className={activeTab === "sustainability" ? "active" : ""}
          onClick={() => setActiveTab("sustainability")}
        >
          {t("NavDetailProduct.SostenibilidadDeLaMarca")}
        </h2>
        <h2
          className={activeTab === "infoMarketing" ? "active" : ""}
          onClick={() => setActiveTab("infoMarketing")}
        >
          {t("NavDetailProduct.InformacionMarketing")}
        </h2>
      </div>
      <div className="navbar-underline"></div>
    </>
)
};

export default NavDetailProduct;
