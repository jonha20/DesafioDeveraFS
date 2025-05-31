import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavResults = ({setActiveTab, activeTab}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();



  
  return (
    <>
      <div className="navbar">
        <h2
          className={activeTab === "productos" ? "active" : ""}
          onClick={() => setActiveTab("productos")} 
        >
          {t("Productos")}
        </h2>
        <h2
          className={activeTab === "archivos" ? "active" : ""}
          onClick={() => setActiveTab("archivos")} 
        >
          {t("Archivos")}
        </h2>
        <h2
          className={activeTab === "informacion" ? "active" : ""}
          onClick={() => setActiveTab("informacion")} 
        >
          {t("Informacion General")}
        </h2>
      </div>
      <div className="navbar-underline"></div>
    </>
  );
};

export default NavResults;