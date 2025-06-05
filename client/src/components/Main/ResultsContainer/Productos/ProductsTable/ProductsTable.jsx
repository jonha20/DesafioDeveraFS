import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "@/src/context/userContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CloudConvert from "cloudconvert";
import { ToastContainer, toast } from "react-toastify";
import ProductDetail from "../ProductDetail/ProductDetail";

const ProductsTable = ({
  producto,
  onClick,
  setSingleProducto,
  setActiveSection,
}) => {
  const { user } = useContext(UserContext);
  const percent = Math.max(0, Math.min(100, producto.impact_score));
  const left = `calc(${percent}% - 16px)`;
  const { t } = useTranslation();
  const [showDetail, setShowDetail] = useState(false);
  const notify = (message, type) => toast[type](message);

  const postProducto = async () => {
    try {
      let id_brand = user.id_brand;
      let product_name = producto.name || producto.product_name;
      let href = producto.href;

      await axios.post(
        `${import.meta.env.VITE_RENDER_BACKEND_URL}/productos_impacto`,
        {
          product_name,
          href,
          id_brand,
        },
        { withCredentials: true }
      );
      onClick();
    } catch (error) {
      console.error("Error posting producto:", error);
    }
  };
  const handleArchivosClick = () => {
    setActiveSection("archivos"); // Cambia la sección activa a "archivos"
    setSingleProducto(producto); // Establece el producto seleccionado
  };

  //Función para ver el detalle del producto
  const handleDetailClick = () => {
    setActiveSection("detalle");
    setShowDetail(true);
    setSingleProducto(producto); // Establece el producto seleccionado
  }

  const docxToPdf = async (producto) => {
   
      const cloudConvert = new CloudConvert(
        `${import.meta.env.VITE_CLOUDCONVERT_API_KEY}`
      );
try{
      let job = await cloudConvert.jobs.create({
        tasks: {
          "product-import": {
            operation: "import/url",
            url: producto.product_pdf,
            filename: producto.product_name + ".docx",
          },
          "product-convert": {
            operation: "convert",
            input_format: "docx",
            output_format: "pdf",
            engine: "libreoffice",
            input: ["product-import"],
            optimize_print: true,
            pdf_a: false,
            include_markup: false,
            bookmarks: false,
            engine_version: "24.8.4",
          },
          "product-export": {
            operation: "export/url",
            input: ["product-convert"],
            inline: false,
            archive_multiple_files: false,
          },
        },
        tag: "jobbuilder",
      });

      job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

      const file = cloudConvert.jobs.getExportUrls(job)[0]; // Obtén la URL del archivo exportado

      // Abre el archivo en una nueva ventana para descargarlo
      window.open(file.url, "_blank");
      notify("Archivo convertido y descargado exitosamente", "success");
    } catch (error) {
      console.error("Error converting DOCX to PDF:", error);
      notify("Error al convertir el archivo: " + error.message, "error");
    }
  };

  // DESKTOP: Table row
  return (<>
    <tr className="table-row">
      <td className="table-cell" data-label={t("TableTitles.Producto")}>
        {producto.image && (
          <img
            src={producto.image}
            alt={producto.name || producto.product_name}
          />
        )}
        <span className="product-name">
          {producto.name || producto.product_name}
        </span>
      </td>
      <td
        className="table-cell"
        data-label={t("TableTitles.Huella de carbono")}
      >
        <div className="carbon-footprint-container">
    <b>{producto.co2_firgerprint}</b>
    <p> kg CO₂ eq</p>
  </div>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Diferncia huella")}>
        <b>{producto.pct_benchmark}%</b>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Score")}>
        <div className="score-bar-container">
          <div className="score-bar">
            <div className="score-bar-segment red" />
            <div className="score-bar-segment orange" />
            <div className="score-bar-segment yellow" />
            <div className="score-bar-segment lime" />
            <div className="score-bar-segment green" />
          </div>
          <div className="score-badge" style={{ left }}>
            <span className="score-badge-circle">{producto.seal}</span>
          </div>
        </div>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Status")}>
        <span
          className={
            "status-badge " +
            (producto.status === "Processing"
              ? "status-analisis"
              : producto.status === "Completed"
              ? "status-finalizado"
              : producto.status === "Pending"
              ? "status-pendiente"
              : "")
          }
        >
          {producto.status}
        </span>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Ver")}>
        {producto.product_pdf !== null && (
        <button
          title="Ver"
          onClick={handleDetailClick}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/icons/eye.svg" alt="eye" />
        </button>)}
      </td>
      <td className="table-cell" data-label={t("TableTitles.Descargar")}>
        {producto.product_pdf !== null && (
        <button
          title="Descargar"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onClick={() => docxToPdf(producto)}
        >
          <img src="/icons/file_save.svg" alt="file_save" />
        </button>
         )}
      </td>
      <td className="table-cell" data-label={t("TableTitles.Archivos")}>
        {producto.status !== "Completed" && (
          <button
            title="Archivos"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={handleArchivosClick}
          >
            <img src="/icons/attach_file.svg" alt="attach_file" />
          </button>
        )}
      </td>
    </tr>
     
    </>
  );
};

export default ProductsTable;
