import React, {useState , useEffect, useMemo} from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Filters from "./Productos/Filters/Filters";
import ProductsTable from "./Productos/ProductsTable/ProductsTable";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

  



const Results = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [productos, setProductos] = useState([]);
  const [results, setResults] = useState([]);
  const [filterProducto, setFilterProducto] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { t } = useTranslation();
  
  

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("https://desafiodeverafs.onrender.com/productos_impacto");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/data.json");
        setProductos(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchProducts();

}, []);
  console.log("Productos:", results);

// Filtrado avanzado: busca el texto ingresado en cualquier campo del producto
const filteredProductos = results.filter((producto) => {
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
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab}/>
      <div className="results-container">
      
      <Filters  setFilterProducto={setFilterProducto} data={sortedProductos}/>
      <table className="results-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="sortable-column">
                <span className="column-title">{t("TableTitles.Producto")}</span>
                <span className="sort-icons">
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("product_name", "asc")}
                    style={{
                      color:
                        sortField === "product_name" && sortOrder === "asc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_up.svg" alt="arrow_up" />
                  </span>
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("product_name", "desc")}
                    style={{
                      color:
                        sortField === "product_name" && sortOrder === "desc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_down.svg" alt="arrow_down" />
                  </span>
                </span>
              </th>
              <th className="sortable-column">
                <span className="column-title">{t("TableTitles.Huella de carbono")}</span>
                <span className="sort-icons">
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("co2_firgerprint", "asc")}
                    style={{
                      color:
                        sortField === "co2_firgerprint" && sortOrder === "asc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_up.svg" alt="arrow_up" />
                  </span>
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("co2_firgerprint", "desc")}
                    style={{
                      color:
                        sortField === "co2_firgerprint" && sortOrder === "desc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_down.svg" alt="arrow_down" />
                  </span>
                </span>
              </th>
              <th className="sortable-column">
                <span className="column-title">{t("TableTitles.Diferncia huella")}</span>
                <span className="sort-icons">
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("pct_benchmark", "asc")}
                    style={{
                      color:
                        sortField === "pct_benchmark" && sortOrder === "asc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_up.svg" alt="arrow_up" />
                  </span>
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("pct_benchmark", "desc")}
                    style={{
                      color:
                        sortField === "pct_benchmark" && sortOrder === "desc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_down.svg" alt="arrow_down" />
                  </span>
                </span>
              </th>
              <th className="sortable-column">
                <span className="column-title">{t("TableTitles.Score")}</span>
                <span className="sort-icons">
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("score", "asc")}
                    style={{
                      color:
                        sortField === "score" && sortOrder === "asc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_up.svg" alt="arrow_up" />
                  </span>
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("score", "desc")}
                    style={{
                      color:
                        sortField === "score" && sortOrder === "desc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_down.svg" alt="arrow_down" />
                  </span>
                </span>
              </th>
              <th className="sortable-column">
                <span className="column-title">{t("TableTitles.Status")}</span>
                <span className="sort-icons">
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("status", "asc")}
                    style={{
                      color:
                        sortField === "status" && sortOrder === "asc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_up.svg" alt="arrow_up" />
                  </span>
                  <span
                    className="sort-icon"
                    onClick={() => handleSort("status", "desc")}
                    style={{
                      color:
                        sortField === "status" && sortOrder === "desc"
                          ? "#1976d2"
                          : "inherit",
                    }}
                  >
                    <img src="/icons/arrow_down.svg" alt="arrow_down" />
                  </span>
                </span>
              </th>
              <th>{t("TableTitles.Ver")}</th>
              <th>{t("TableTitles.Descargar")}</th>
              <th>{t("TableTitles.Archivos")}</th>
            </tr>
          </thead>
        <tbody>
          {sortedProductos.map((producto) => (
            productos.map((product) => (
            <ProductsTable key={uuidv4()} results={producto} producto={product}  />
          ))))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Results;