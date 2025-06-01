import React, { useState, useCallback } from "react";
import '../../../../styles/components/_Archivos.scss';
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";

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

  const onDrop = useCallback((acceptedFiles) => {
    const nuevosArchivos = acceptedFiles.map((file, index) => ({ 
      id: archivos.length + index + 1,
      nombre: file.name
    }))
    setArchivos(prev => [...prev, ...nuevosArchivos])
  }, [archivos])

  //Hook con picker y drop habilitados
  const { getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDrop,
    noClick: true, //Desactiva el click automático en el área de soltar archivos
    noKeyboard: true, //Evita la activación con el teclado
    accept: { "text/csv": [".csv"]} //Restringe de momento solo archivos csv
  })

  const handleDescargarArchivos = () => {
    alert("Simulando descarga de archivos...");
  };

  return (
    <div className="archivos-container">

      {/* Botones */}
      <div className="archivos-buttons">
        {/* Botón normal que abre file picker programáticamente */}
        <button className="btn-anadir" type="button" onClick={open}>
          {t("ArchivosPage.AnadirArchivos")}
        </button>

        {/* Botón para descargar archivos */}
        <button className="btn-descargar" onClick={handleDescargarArchivos}>
          <img src="/icons/download-icon.png" alt="icono descargar" className="icono-descargar" />
          {t("ArchivosPage.DescargarArchivos")}
        </button>
      </div>

      {/* Área separada para drag and drop */}
      <div className="dropzone-wrapper" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={`dropzone-area ${isDragActive ? 'activo' : ''}`}>
          <p>
            {isDragActive
              ? t("ArchivosPage.SueltaParaSubir")
              : t("ArchivosPage.PlaceholderArrastra")}
          </p>
        </div>
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