import React, { useState, useCallback } from "react";
import '../../../../styles/components/_Archivos.scss';
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";

const Archivos = () => {
  const [archivos, setArchivos] = useState([]);
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
    accept: { 
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
    }
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