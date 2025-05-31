// import React from "react";
// import { useTranslation } from "react-i18next";

// const ProductsTable = ({results, producto }) => {
//   const percent = Math.max(0, Math.min(100, producto.impact_score));
//   const left = `calc(${percent}% - 16px)`;



//   // DESKTOP: Table row
//   return (
//     <tr className="table-row">
//       <td className="table-cell">
//         <input type="checkbox" />
//       </td>
//       <td className="table-cell">
//         <img src={producto.image} alt={producto.name} />
//         <span className="product-name">{producto.name}</span>
//       </td>
//       <td className="table-cell">{results.co2_firgerprint}</td>
//       <td className="table-cell">{results.pct_benchmark}%</td>
//       <td className="table-cell">
//         <div className="score-bar-container">
//           <div className="score-bar">
//             <div className="score-bar-segment green" />
//             <div className="score-bar-segment lime" />
//             <div className="score-bar-segment yellow" />
//             <div className="score-bar-segment orange" />
//             <div className="score-bar-segment red" />
//           </div>
//           <div className="score-badge" style={{ left }}>
//             <span className="score-badge-circle">{results.seal}</span>
//           </div>
//         </div>
//       </td>
//       <td className="table-cell">
//         <span className={
//           "status-badge " +
//           (results.status === "Processing"
//             ? "status-analisis"
//             : results.status === "Finalized"
//             ? "status-finalizado"
//             : results.status === "Pending"
//             ? "status-pendiente"
//             : "")
//         }>
//           {results.status}
//         </span>
//       </td>
//       <td className="table-cell">
//         <button title="Ver" style={{ background: "none", border: "none", cursor: "pointer" }}>
//           <img src="/icons/eye.svg" alt="eye" />
//         </button>
//       </td>
//       <td className="table-cell">
//         <button title="Descargar" style={{ background: "none", border: "none", cursor: "pointer" }}>
//           <img src="/icons/file_save.svg" alt="file_save" />
//         </button>
//       </td>
//       <td className="table-cell">
//         <button title="Archivos" style={{ background: "none", border: "none", cursor: "pointer" }}>
//           <img src="/icons/attach_file.svg" alt="attach_file" />
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default ProductsTable;


import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const ProductsTable = ({ results, producto }) => {
  const [showPreview, setShowPreview] = useState(false);

  const percent = Math.max(0, Math.min(100, producto.impact_score));
  const left = `calc(${percent}% - 16px)`;

  const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
    section: { marginBottom: 10 },
    image: { width: 100, height: 100, marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 15 },
    text: { fontSize: 12, marginBottom: 5 },
    viewer: { width: "100%", height: 400, border: "1px solid #ccc", marginTop: 20 },
  });

  const ProductDocument = (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Ficha del Producto</Text>
        <Image style={styles.image} src={producto.image} />
        <View style={styles.section}>
          <Text style={styles.text}>Nombre: {producto.name}</Text>
          <Text style={styles.text}>Marca: {results.seal|| "N/A"}</Text>
          <Text style={styles.text}>Precio: {producto.price || "N/A"}</Text>
          <Text style={styles.text}>Impact Score: {results.impact_score ?? "No disponible"}</Text>
          <Text style={styles.text}>CO2: {results.co2_firgerprint}</Text>
          <Text style={styles.text}>Benchmark: {results.pct_benchmark}%</Text>
          <Text style={styles.text}>Estado: {results.status}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
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
          <span
            className={
              "status-badge " +
              (results.status === "Processing"
                ? "status-analisis"
                : results.status === "Finalized"
                ? "status-finalizado"
                : results.status === "Pending"
                ? "status-pendiente"
                : "")
            }
          >
            {results.status}
          </span>
        </td>
        <td className="table-cell">
          <button
            onClick={() => setShowPreview(!showPreview)}
            title="Ver"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img src="/icons/eye.svg" alt="eye" />
          </button>
        </td>
        <td className="table-cell">
          <PDFDownloadLink
            document={ProductDocument}
            fileName={`${producto.name}.pdf`}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            title="Descargar"
          >
            {({ loading }) =>
              loading ? (
                <img
                  src="/icons/file_save.svg"
                  alt="file_save"
                  style={{ opacity: 0.5 }}
                />
              ) : (
                <img src="/icons/file_save.svg" alt="file_save" />
              )
            }
          </PDFDownloadLink>
        </td>
        <td className="table-cell">
          <button
            title="Archivos"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img src="/icons/attach_file.svg" alt="attach_file" />
          </button>
        </td>
      </tr>

      {showPreview && (
        <tr>
          <td colSpan="9" style={{ padding: 20, background: "#f9f9f9" }}>
            <h4>Vista previa del producto</h4>
            <PDFViewer style={styles.viewer}>{ProductDocument}</PDFViewer>
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductsTable;


