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
          {t("NavProductos.Resumen")}
        </h2>
        <h2
          className={activeTab === "conclusions" ? "active" : ""}
          onClick={() => setActiveTab("conclusions")}
        >
          {t("NavProductos.Conclusiones")}
        </h2>
        <h2
          className={activeTab === "detailsCat" ? "active" : ""}
          onClick={() => setActiveTab("detailsCat")}
        >
          {t("NavProductos.DetallesCategoria")}
        </h2>
        <h2
          className={activeTab === "comparative" ? "active" : ""}
          onClick={() => setActiveTab("comparative")}
        >
          {t("NavProductos.Comparativa")}
        </h2>
        <h2
          className={activeTab === "sustainability" ? "active" : ""}
          onClick={() => setActiveTab("sustainabilityt")}
        >
          {t("NavProductos.SustenibilidadDeLaMarca")}
        </h2>
        <h2
          className={activeTab === "infoMarketing" ? "active" : ""}
          onClick={() => setActiveTab("infoMarketing")}
        >
          {t("NavProductos.InformacionMarketing")}
        </h2>
      </div>
      <div className="navbar-underline"></div>
    </>
)
};

export default NavDetailProduct;
