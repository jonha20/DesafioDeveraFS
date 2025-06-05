import React, { useState, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/src/context/userContext";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const Archivos = ({ singleProducto }) => {
  const { user, setProductoAnalizado } = useContext(UserContext);
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
      let img_url = singleProducto.img_url || singleProducto.image;


      console.log("Datos enviados:", {
        product_name,
        href,
        id_brand,
        links: concatenatedUrls,
        img_url
      });
    notify("Analizando producto, esto tardara unos minutos", "success");
      await axios.post(
        `${import.meta.env.VITE_RENDER_BACKEND_URL}/productos_impacto`,
        {
          product_name,
          href,
          id_brand,
          links: concatenatedUrls, // Envía las URLs concatenadas aquí
          img_url
        },
        { withCredentials: true }
      );
      notify("Producto enviado correctamente", "success");
       const response = await axios.post(
  `https://proyectogit-production.up.railway.app/analizar_co2?product_name=${encodeURIComponent(product_name)}&url_docs=${encodeURIComponent(concatenatedUrls)}&id_brand=${encodeURIComponent(id_brand)}`,
  {},
  { withCredentials: true }
);
setProductoAnalizado(response.data); // <-- aquí guardas la respuesta
      console.log("Analizado producto");
      notify("Producto analizado", "success");
     
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

  
const uploadFile = async (file, folderId) => {
  try {
    const storageRef = ref(storage, `${folderId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    notify("Archivo subido exitosamente", "success");
    return url;
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

  // Genera un identificador único para la carpeta
  const folderId = uuidv4();

  const uploadPromises = archivos.map((archivo) => uploadFile(archivo.archivo, folderId));
  try {
    const urls = await Promise.all(uploadPromises);
    const concatenatedUrls = urls.join(" | ");
    console.log("URLs de archivos subidos:", concatenatedUrls);
    // Si quieres guardar solo el nombre de la carpeta:
    await postProducto(concatenatedUrls);
    notify(`Todos los archivos se han subido exitosamente a la carpeta: ${folderId}`, "success");
  } catch (err) {
    console.error("Error al subir archivos:", err);
    notify("Error al subir archivos: " + err.message, "error");
  }
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
      </div>
    </>
  );
};

export default Archivos;
