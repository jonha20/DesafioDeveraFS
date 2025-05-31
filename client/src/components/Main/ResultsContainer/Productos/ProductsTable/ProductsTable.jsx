import React from "react";
import { useTranslation } from "react-i18next";

const ProductsTable = ({results, producto }) => {
  const percent = Math.max(0, Math.min(100, producto.impact_score));
  const left = `calc(${percent}% - 16px)`;



  // DESKTOP: Table row
  return (
    <tr className="table-row">
      <td className="table-cell">
        <input type="checkbox" />
      </td>
      <td className="table-cell">
        <img src={producto.image} alt={producto.name} />
        <span className="product-name">{producto.name}</span>
      </td>
      <td className="table-cell">{results.co2_firgerprint}</td>
      <td className="table-cell">{results.pct_benchmark}%</td>
      <td className="table-cell">
        <div className="score-bar-container">
          <div className="score-bar">
            <div className="score-bar-segment green" />
            <div className="score-bar-segment lime" />
            <div className="score-bar-segment yellow" />
            <div className="score-bar-segment orange" />
            <div className="score-bar-segment red" />
          </div>
          <div className="score-badge" style={{ left }}>
            <span className="score-badge-circle">{results.seal}</span>
          </div>
        </div>
      </td>
      <td className="table-cell">
        <span className={
          "status-badge " +
          (results.status === "Processing"
            ? "status-analisis"
            : results.status === "Finalized"
            ? "status-finalizado"
            : results.status === "Pending"
            ? "status-pendiente"
            : "")
        }>
          {results.status}
        </span>
      </td>
      <td className="table-cell">
        <button title="Ver" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <img src="/icons/eye.svg" alt="eye" />
        </button>
      </td>
      <td className="table-cell">
        <button title="Descargar" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <img src="/icons/file_save.svg" alt="file_save" />
        </button>
      </td>
      <td className="table-cell">
        <button title="Archivos" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <img src="/icons/attach_file.svg" alt="attach_file" />
        </button>
      </td>
    </tr>
  );
};

export default ProductsTable;
