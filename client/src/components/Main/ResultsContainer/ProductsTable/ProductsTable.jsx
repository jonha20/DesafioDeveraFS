import React from "react";
import styles from "./ProductsTable.module.scss";


const ProductsTable = ({producto}) => {
    // Calcula el porcentaje y la posición del sello
  const percent = Math.max(0, Math.min(100, producto.impact_score));
  const left = `calc(${percent}% - 16px)`;

  console.log("Producto:", producto);
return (
 <tr className="table-row">
    <td className="table-cell">
      <input type="checkbox" />
    </td>
    <td className="table-cell">{producto.product_name}</td>
    <td className="table-cell hide-mobile">{producto.co2_firgerprint}</td>
    <td className="table-cell hide-mobile">{producto.pct_benchmark}%</td>
    <td className="table-cell">
      <div className="score-bar-container">
        <div className="score-bar">
          <div className="score-bar-segment green" />
          <div className="score-bar-segment lime" />
          <div className="score-bar-segment yellow" />
          <div className="score-bar-segment orange" />
          <div className="score-bar-segment red" />
        </div>
        <div
          className="score-badge"
          style={{ left }}
        >
          <span className="score-badge-circle">
            {producto.seal}
          </span>
        </div>
      </div>
    </td>
    <td className="table-cell hide-mobile">
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
    <td className="table-cell">
      <button title="Ver" style={{ background: "none", border: "none", cursor: "pointer" }}>
        <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.5" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="9" ry="6" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      </button>
    </td>
    <td className="table-cell hide-mobile">
      <button title="Descargar" style={{ background: "none", border: "none" , cursor: "pointer" }}>
        <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M12 8v6m0 0l-2-2m2 2l2-2" />
        </svg>
      </button>
    </td>
    <td className="table-cell hide-mobile">
      <button title="Archivos" style={{ background: "none", border: "none", cursor: "pointer" }}>
        <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <rect x="3" y="7" width="10" height="14" rx="2" />
          <path d="M16 7l2 2" />
        </svg>
      </button>
    </td>
  </tr>
);
};

export default ProductsTable;
