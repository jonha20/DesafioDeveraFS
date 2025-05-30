import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const NavResults = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("productos");

  return (<>
    <div className="nav-products">
      <h2
        className={activeTab === "productos" ? "active" : ""}
        onClick={() => setActiveTab("productos")}
      >
        {t("NavProductos.Productos")}
      </h2>
      <h2
        className={activeTab === "archivos" ? "active" : ""}
        onClick={() => setActiveTab("archivos")}
      >
        {t("NavProductos.Archivos")}
      </h2>
      <h2
        className={activeTab === "informacion" ? "active" : ""}
        onClick={() => setActiveTab("informacion")}
      >
        {t("NavProductos.Informacion")}
      </h2>
    </div>
     <div className="nav-products-underline"></div>
    </>
  );
};

export default NavResults;