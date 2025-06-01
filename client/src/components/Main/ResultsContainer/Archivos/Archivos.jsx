import React, { useState } from "react";
import '../../../../styles/components/_Archivos.scss';
import { useTranslation } from "react-i18next";

// Este es un listado inicial simulado de archivos
const archivosIniciales = [
  { id: 1, nombre: "apollo-cosmetics-IT.csv" },
  { id: 2, nombre: "apollo-cosmetics-MX.csv" },
  { id: 3, nombre: "apollo-fashionDE.csv" },
  { id: 4, nombre: "app.clever_gy_products_1.csv" },
  { id: 5, nombre: "app.clever_gy_products_2.csv" },
  { id: 6, nombre: "app.nastaeco_products_XYZ.csv" }
];

const Archivos = () => {
  const [archivos, setArchivos] = useState(archivosIniciales);
  const { t } = useTranslation();

  const handleAnadirArchivos = () => {
    // Esto es solo un simulacro. Aquí en el futuro podrías abrir el file picker.
    const nuevoArchivo = { id: archivos.length + 1, nombre: `nuevo-archivo-${archivos.length + 1}.csv` };
    setArchivos([...archivos, nuevoArchivo]);
  };

  const handleDescargarArchivos = () => {
    alert("Simulando descarga de archivos...");
  };

  return (
    <div className="archivos-container">

      {/* Botones */}
      <div className="archivos-buttons">
      <button className="btn-anadir" onClick={handleAnadirArchivos}>
        {t("ArchivosPage.AnadirArchivos")}
      </button>
      <button className="btn-descargar" onClick={handleDescargarArchivos}>
        <img src="/icons/file_save.svg" alt="icono descargar" className="icono-descargar" />
        {t("ArchivosPage.DescargarArchivos")}
      </button>
      </div>

      {/* Lista de archivos */}
      <div className="archivos-listado">
        {archivos.map((archivo) => (
          <div key={archivo.id} className="archivo-item">
            <img src="/icons/attach_file.svg" alt="icono archivo" className="archivo-icono" />
            <p className="archivo-nombre">{archivo.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archivos;