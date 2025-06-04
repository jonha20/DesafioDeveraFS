import React from "react";
import { useTranslation } from "react-i18next";
import CloudConvert from "cloudconvert";
import { ToastContainer, toast } from "react-toastify";

const HeadProduct = ({
  productData,
  onAttachFile,
  onViewReport,
  onDownloadReport,
  setActiveMainTab,
}) => {
  const { t } = useTranslation();
  const notify = (message, type) => toast[type](message);
  
  // Validación para que productData y sus propiedades existan

  const product_name = productData.product_name || "Producto sin nombre";
  const href = productData.img_url || "";
  const impact_score = productData.impact_score ?? 0;
  const seal = productData.seal || "-";
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

  return (<>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="head-product">
      <div className="head-product__left">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <img
              src={href}
              alt={product_name}
              className="head-product__image"
            />
          </a>
        ) : (
          <div className="head-product__placeholder">
            <span>{t("HeadProduct.Sin imagen")}</span>
          </div>
        )}
      </div>

      <div className="head-product__center">
        <div className="head-product__name-score">
          <h2 className="head-product__name">{product_name}</h2>

          <div className="head-product__impact">
            <span className="head-product__label">
              {t("HeadProduct.impact_score")}
            </span>

            <div className="head-product__score-wrapper">
              {/* sello sobre la barra */}
              <div
                className="head-product__seal-wrapper"
                style={{ left: `${impact_score}%` }}
              >
                <span className="head-product__seal">{seal}</span>
              </div>

              {/* barra de color */}
              <div className="head-product__bar" />
            </div>

            <span className="head-product__score">{impact_score}/100</span>
          </div>
        </div>

        <div className="head-product__details">
          <div>
            <strong>{t("HeadProduct.Modelo")}:</strong>{" "}
            <p>{productData.modelo || "modelo"}</p>
          </div>
          <div>
            <strong>{t("HeadProduct.Categoría")}:</strong>{" "}
            <p>{productData.categoria || "modelo"}</p>
          </div>
          <div>
            <strong>{t("HeadProduct.Marca")}:</strong>{" "}
            <p>{productData.marca || "modelo"}</p>
          </div>
          <div>
            <strong>{t("HeadProduct.Enlace")}:</strong>{" "}
            <a
              href="https://www.devera.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.devera.ai
            </a>
          </div>
        </div>
      </div>

      <div className="head-product__right">
        <button className="action-button" onClick={() => setActiveMainTab("productos")}>
          <img src="/icons/eye.svg" alt="view" /> {t("HeadProduct.Ver reporte")}
        </button>
        <button className="action-button" onClick={() => docxToPdf(productData)}>
          <img src="/icons/file_save.svg" alt="download" />{" "}
          {t("HeadProduct.Descargar reporte")}
        </button>
        <button className="action-button" onClick={() => setActiveMainTab("archivos")}>
          <img src="/icons/attach_file.svg" alt="attach" />{" "}
          {t("HeadProduct.Adjuntar archivo")}
        </button>
      </div>
    </div></>
  );
};

export default HeadProduct;
