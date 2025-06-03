import React from "react";
import { useTranslation } from "react-i18next";

const HeadProduct = ({
  productData,
  onAttachFile,
  onViewReport,
  onDownloadReport,
}) => {
  const { t } = useTranslation();

  // Validación para que productData y sus propiedades existan

  const product_name = productData.product_name || "Producto sin nombre";
  const href = productData.img_url || "";
  const impact_score = productData.impact_score ?? 0;
  const seal = productData.seal || "-";

  return (
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
              {t("HeadProduct.IMPACT SCORE")}
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
        <button className="action-button" onClick={onViewReport}>
          <img src="/icons/eye.svg" alt="view" /> {t("HeadProduct.Ver reporte")}
        </button>
        <button className="action-button" onClick={onDownloadReport}>
          <img src="/icons/file_save.svg" alt="download" />{" "}
          {t("HeadProduct.Descargar reporte")}
        </button>
        <button className="action-button" onClick={onAttachFile}>
          <img src="/icons/attach_file.svg" alt="attach" />{" "}
          {t("HeadProduct.Adjuntar archivo")}
        </button>
      </div>
    </div>
  );
};

export default HeadProduct;
