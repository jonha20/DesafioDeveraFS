import React, {useState , useEffect, useMemo} from "react";
import axios from "axios";
import NavProducts from "./NavProducts/NavProducts";
import Filters from "./Filters/Filters";
import ProductsTable from "./ProductsTable/ProductsTable";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Results = () => {
  const [productos, setProductos] = useState([]);
  const [filterProducto, setFilterProducto] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("https://desafiodeverafs.onrender.com/productos_impacto");
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

// Filtrado avanzado: busca el texto ingresado en cualquier campo del producto
const filteredProductos = productos.filter((producto) => {
  const lowerFilter = filterProducto.toLowerCase();
  const matchAnyField = Object.values(producto).some((value) =>
    String(value).toLowerCase().includes(lowerFilter)
  );
  const matchStatus = filterStatus ? producto.status === filterStatus : true;
  return matchAnyField && matchStatus;
});

  // Ordenación
  const sortedProductos = [...filteredProductos].sort((a, b) => {
    if (!sortField) return 0;
    let aValue = a[sortField];
    let bValue = b[sortField];
    // Si es string, comparar como string
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Handler para ordenar
  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };


  return (
    <>
      <NavProducts />
      <div className="results-container">
      
      <Filters  setFilterProducto={setFilterProducto}/>
      <table className="results-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>
              {t("TableTitles.Producto")}
              <span className="sort-icons">
                <span
                  style={{ cursor: "pointer", color: sortField === "product_name" && sortOrder === "asc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("product_name", "asc")}
                >&#9650;</span>
                <span
                  style={{ cursor: "pointer", color: sortField === "product_name" && sortOrder === "desc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("product_name", "desc")}
                >&#9660;</span>
              </span>
            </th>
            <th>
              {t("TableTitles.Huella de carbono")}
              <span className="sort-icons">
                <span
                  style={{ cursor: "pointer", color: sortField === "co2_firgerprint" && sortOrder === "asc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("co2_firgerprint", "asc")}
                >&#9650;</span>
                <span
                  style={{ cursor: "pointer", color: sortField === "co2_firgerprint" && sortOrder === "desc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("co2_firgerprint", "desc")}
                >&#9660;</span>
              </span>
            </th>
            <th>
              {t("TableTitles.Diferncia huella")}
              <span className="sort-icons">
                <span
                  style={{ cursor: "pointer", color: sortField === "pct_benchmark" && sortOrder === "asc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("pct_benchmark", "asc")}
                >&#9650;</span>
                <span
                  style={{ cursor: "pointer", color: sortField === "pct_benchmark" && sortOrder === "desc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("pct_benchmark", "desc")}
                >&#9660;</span>
              </span>
            </th>
            <th>
              {t("TableTitles.Score")}
              <span className="sort-icons">
                <span
                  style={{ cursor: "pointer", color: sortField === "score" && sortOrder === "asc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("score", "asc")}
                >&#9650;</span>
                <span
                  style={{ cursor: "pointer", color: sortField === "score" && sortOrder === "desc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("score", "desc")}
                >&#9660;</span>
              </span>
            </th>
            <th>
              {t("TableTitles.Status")}
              <span className="sort-icons">
                <span
                  style={{ cursor: "pointer", color: sortField === "status" && sortOrder === "asc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("status", "asc")}
                >&#9650;</span>
                <span
                  style={{ cursor: "pointer", color: sortField === "status" && sortOrder === "desc" ? "#1976d2" : undefined }}
                  onClick={() => handleSort("status", "desc")}
                >&#9660;</span>
              </span>
            </th>
            <th>{t("TableTitles.Ver")}</th>
            <th>{t("TableTitles.Descargar")}</th>
            <th>{t("TableTitles.Archivos")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedProductos.map((producto) => (
            <ProductsTable key={uuidv4()} producto={producto} />
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Results;