import React, {useEffect , useContext} from "react";
import { UserContext } from "@/src/context/userContext";
import axios from "axios";
import { useTranslation } from "react-i18next";


const ProductsTable = ({ producto ,onClick}) => {
  const { user } = useContext(UserContext);
  const percent = Math.max(0, Math.min(100, producto.impact_score));
  const left = `calc(${percent}% - 16px)`;
  const { t } = useTranslation();

const postProducto = async () => {
  try {
    let id_brand = user.id_brand;
    let product_name = producto.name || producto.product_name;
    let href = producto.href;

    console.log("Datos enviados:", { product_name, href, id_brand });

    await axios.post("https://desafiodeverafs.onrender.com/productos_impacto", {
      product_name,
      href,
      id_brand
    }, { withCredentials: true });
    onClick(); 
  } catch (error) {
    console.error("Error posting producto:", error);
  }
};


  // DESKTOP: Table row
  return (
    <tr className="table-row">
      <td className="table-cell">
  <input type="checkbox" onClick={postProducto}/>
      </td>
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
      <td className="table-cell" data-label={t("TableTitles.Huella de carbono")}>{producto.co2_firgerprint}</td>
      <td className="table-cell" data-label={t("TableTitles.Diferncia huella")}>{producto.pct_benchmark}%</td>
      <td className="table-cell" data-label={t("TableTitles.Score")}>
        <div className="score-bar-container">
          <div className="score-bar">
            <div className="score-bar-segment green" />
            <div className="score-bar-segment lime" />
            <div className="score-bar-segment yellow" />
            <div className="score-bar-segment orange" />
            <div className="score-bar-segment red" />
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
              : producto.status === "Finalized"
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
        <button
          title="Ver"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/icons/eye.svg" alt="eye" />
        </button>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Descargar")}>
        <button
          title="Descargar"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/icons/file_save.svg" alt="file_save" />
        </button>
      </td>
      <td className="table-cell" data-label={t("TableTitles.Archivos")}>
        {producto.status !== "Finalized" && (
          <button
            title="Archivos"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img src="/icons/attach_file.svg" alt="attach_file" />
          </button>
        )}
      </td>
    </tr>
  );
};

export default ProductsTable;
