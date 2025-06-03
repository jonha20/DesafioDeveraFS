import React from "react";
import { useTranslation } from "react-i18next";

const HeadProduct = ({ productData, onAttachFile, onViewReport, onDownloadReport }) => {
  const { t } = useTranslation();

  // Validación para que productData y sus propiedades existan
  const product = productData?.products || {};
  const resume = productData?.products_impacts_resume || {};

  const product_name = product.product_name || "Producto sin nombre";
  const href = product.href || "";
  const impact_score = resume.impact_score ?? 0;
  const seal = resume.seal || "-";

  return (
    <div className="head-product">
      <div className="head-product__left">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={href} alt={product_name} className="head-product__image" />
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
            <span className="head-product__label">{t("HeadProduct.IMPACT SCORE")}</span>

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
          <div><strong>{t("HeadProduct.Modelo")}:</strong> {product.modelo || "-"}</div>
          <div><strong>{t("HeadProduct.Categoría")}:</strong> {product.categoria || "-"}</div>
          <div><strong>{t("HeadProduct.Marca")}:</strong> {product.marca || "-"}</div>
          <div>
            <strong>{t("HeadProduct.Enlace")}:</strong>{" "}
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {href}
              </a>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>

      <div className="head-product__right">
        <button className="action-button" onClick={onViewReport}>
          <img src="/icons/eye.svg" alt="view" /> {t("HeadProduct.Ver reporte")}
        </button>
        <button className="action-button" onClick={onDownloadReport}>
          <img src="/icons/file_save.svg" alt="download" /> {t("HeadProduct.Descargar reporte")}
        </button>
        <button className="action-button" onClick={onAttachFile}>
          <img src="/icons/attach_file.svg" alt="attach" /> {t("HeadProduct.Adjuntar archivo")}
        </button>
      </div>
    </div>
  );
};

export default HeadProduct;
