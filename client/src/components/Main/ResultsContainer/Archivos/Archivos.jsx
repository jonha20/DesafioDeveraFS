import React, { useState, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/src/context/userContext";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Archivos = ({ singleProducto }) => {
  const { user } = useContext(UserContext);
  const [archivos, setArchivos] = useState([]);
  const { t } = useTranslation();
  const notify = (message, type) => toast[type](message);
  console.log("Single Producto:", singleProducto);

   // Verifica si singleProducto es válido al montar o actualizar el componente
  useEffect(() => {
    if (!singleProducto) {
      console.log("Single Producto is undefined or null");
      notify("No hay producto seleccionado", "error");
    } 
  }, [singleProducto]); // Ejecuta el efecto cuando singleProducto cambia

 const postProducto = async (concatenatedUrls) => {
  try {
    let id_brand = user.id_brand;
    let product_name = singleProducto.name || singleProducto.product_name;
    let href = singleProducto.href;

    console.log("Datos enviados:", { product_name, href, id_brand, links: concatenatedUrls });

    await axios.post(
      "http://localhost:3000/productos_impacto",
      {
        product_name,
        href ,
        id_brand,
        links: concatenatedUrls, // Envía las URLs concatenadas aquí
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error posting producto:", error);
  }
};

  const onDrop = useCallback(
    (acceptedFiles) => {
      const nuevosArchivos = acceptedFiles.map((file, index) => ({
        id: archivos.length + index + 1,
        nombre: file.name,
        archivo: file, // Guarda el archivo completo
      }));
      setArchivos((prev) => [...prev, ...nuevosArchivos]);
    },
    [archivos]
  );

  //Hook con picker y drop habilitados
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true, //Desactiva el click automático en el área de soltar archivos
    noKeyboard: true, //Evita la activación con el teclado
    accept: {
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const uploadFile = async (file, productName) => {
    const CLOUD_NAME = "dlxg09rxp"; // cambia esto
    const UPLOAD_PRESET = "unsigned_preset"; // cambia esto

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

    const formData = new FormData();

    // Crea el "public_id" con carpeta virtual por producto
    const publicId = `${productName}/${file.name}`;

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("public_id", publicId);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        console.log("✅ Archivo subido:", data.secure_url);
        notify("Archivo subido exitosamente", "success");
        return data.secure_url;
      } else {
        throw new Error(
          data.error?.message || "Error desconocido al subir archivo"
        );
      }
    } catch (error) {
      console.error("❌ Error al subir archivo:", error.message);
      notify("Error al subir archivo: " + error.message, "error");
      throw error;
    }
  };

 const handleUpload = async () => {
  if (!archivos || archivos.length === 0) {
    notify("No hay archivos para subir", "warning");
    return;
  }

  // Cambiar el formato de la fecha a dd_MM_yyyy
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Asegura que el día tenga 2 dígitos
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const year = today.getFullYear();
  const formattedDate = `${day}_${month}_${year}`;

  const folderName = `${formattedDate}_${singleProducto.name.replace(
    /\s+/g,
    "_"
  )}`;

  // Asegúrate de pasar archivo.archivo al uploadFile
  const uploadPromises = archivos.map((archivo) => {
    console.log("Subiendo archivo:", archivo); // Verifica el contenido de cada archivo
    return uploadFile(archivo.archivo, folderName);
  });

  try {
    // Espera a que todas las promesas de subida se resuelvan
    const urls = await Promise.all(uploadPromises);
    const concatenatedUrls = urls.join(" | "); // Une las URLs con el separador "|"

    console.log("URLs de archivos subidos:", concatenatedUrls); // Verifica las URLs obtenidas

    // Llama a postProducto con las URLs concatenadas
    await postProducto(concatenatedUrls);

    notify("Todos los archivos se han subido exitosamente", "success");
  } catch (err) {
    console.error("Error al subir archivos:", err);
    notify("Error al subir archivos: " + err.message, "error");
  }
};

  const handleDescargarArchivos = () => {
    alert("Simulando descarga de archivos...");
  };

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    <div className="archivos-container">
      {/* Botones */}
      <div className="archivos-buttons">
        {/* Botón normal que abre file picker programáticamente */}
        <button className="btn-anadir" type="button" onClick={open}>
          {t("ArchivosPage.AnadirArchivos")}
        </button>

        {/* Botón para descargar archivos */}
        <button className="btn-descargar" onClick={handleUpload}>
          <img
            src="/icons/attach_file.svg"
            alt="icono descargar"
            className="icono-descargar"
          />
          {t("ArchivosPage.SubirArchivos")}
        </button>
      </div>
      
      {/* Botón para subir archivos a Cloudinary */}
      {/* <button className="btn-subir" onClick={handleUpload}>
        {t("ArchivosPage.SubirArchivos")}
      </button> */}

      {/* Área separada para drag and drop */}
      <div className="dropzone-wrapper" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={`dropzone-area ${isDragActive ? "activo" : ""}`}>
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
            <img
              src="/icons/attach_file.svg"
              alt="icono archivo"
              className="archivo-icono"
            />
            <p className="archivo-nombre">{archivo.nombre}</p>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Archivos;
