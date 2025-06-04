import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar/Navbar";
import Filters from "./Productos/Filters/Filters";
import ProductsTable from "./Productos/ProductsTable/ProductsTable";
import ProductDetail from "./Productos/ProductDetail";
import Archivos from "./Archivos/Archivos";
import Informacion from "./Informacion/Informacion";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import ReactPaginate from 'react-paginate';
import { UserContext } from "@/src/context/userContext";


const Results = () => {
  const { productsScraped } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("productos");
  const [singleProducto, setSingleProducto] = useState("");
  const [results, setResults] = useState([]);
  const [filterProducto, setFilterProducto] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { t } = useTranslation();
  const [itemOffset, setItemOffset] = useState(0);
  const [entries, setEntries] = useState(10);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_RENDER_BACKEND_URL}/productos_impacto/1`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

    useEffect(() => {
    // Llama a fetchResults inmediatamente al montar el componente
    fetchResults();

    // Configura un intervalo para refrescar los resultados cada 10 segundos
    const interval = setInterval(() => {
      fetchResults();
    }, 10000); // 10 segundos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Filtrado avanzado: busca el texto ingresado en cualquier campo del producto
  const filteredProductos = productsScraped.filter((producto) => {
    const lowerFilter = filterProducto.toLowerCase();
    const matchAnyField = Object.values(producto).some((value) =>
      String(value).toLowerCase().includes(lowerFilter)
    );
    return matchAnyField;
  });

  const filteredResults = results.filter((result) => {
    const lowerFilter = filterProducto.toLowerCase();
    const matchAnyField = Object.values(result).some((value) =>
      String(value).toLowerCase().includes(lowerFilter)
    );
    return matchAnyField;
  });
  const uniqueProductos = [...filteredResults, ...filteredProductos].reduce(
    (acc, current) => {
      const exists = acc.find((item) => item.product_name === current.name);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  // Ordenación
  const sortedProductos = uniqueProductos.sort((a, b) => {
    if (!sortField) return 0;
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };
  const endOffset = itemOffset + entries;
  const currentItems = sortedProductos.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProductos.length / entries);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * entries) % sortedProductos.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "productos" && (
        <>
          <div className="results-container">
            <Filters
              setFilterProducto={setFilterProducto}
              data={sortedProductos}
              setPag={setEntries}
            />
            <table className="results-table">
              <thead>
                <tr>
                  <th>{t("TableTitles.Analizar")}</th>
                  <th className="sortable-column">
                    <div className="column-header">
                      <span className="column-title">
                        {t("TableTitles.Producto")}
                      </span>
                      <span className="sort-icons">
                        <span
                          className="sort-icon"
                          onClick={() => handleSort("product_name", "asc")}
                          style={{
                            color:
                              sortField === "product_name" &&
                              sortOrder === "asc"
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
                              sortField === "product_name" &&
                              sortOrder === "desc"
                                ? "#1976d2"
                                : "inherit",
                          }}
                        >
                          <img src="/icons/arrow_down.svg" alt="arrow_down" />
                        </span>
                      </span>
                    </div>
                  </th>
                  <th className="sortable-column">
                    <div className="column-header">
                      <span className="column-title">
                        {t("TableTitles.Huella de carbono")}
                      </span>
                      <span className="sort-icons">
                        <span
                          className="sort-icon"
                          onClick={() => handleSort("co2_firgerprint", "asc")}
                          style={{
                            color:
                              sortField === "co2_firgerprint" &&
                              sortOrder === "asc"
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
                              sortField === "co2_firgerprint" &&
                              sortOrder === "desc"
                                ? "#1976d2"
                                : "inherit",
                          }}
                        >
                          <img src="/icons/arrow_down.svg" alt="arrow_down" />
                        </span>
                      </span>
                    </div>
                  </th>
                  <th className="sortable-column">
                    <div className="column-header">
                      <span className="column-title">
                        {t("TableTitles.Diferncia huella")}
                      </span>
                      <span className="sort-icons">
                        <span
                          className="sort-icon"
                          onClick={() => handleSort("pct_benchmark", "asc")}
                          style={{
                            color:
                              sortField === "pct_benchmark" &&
                              sortOrder === "asc"
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
                              sortField === "pct_benchmark" &&
                              sortOrder === "desc"
                                ? "#1976d2"
                                : "inherit",
                          }}
                        >
                          <img src="/icons/arrow_down.svg" alt="arrow_down" />
                        </span>
                      </span>
                    </div>
                  </th>
                  <th className="sortable-column">
                    <div className="column-header">
                      <span className="column-title">
                        {t("TableTitles.Score")}
                      </span>
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
                    </div>
                  </th>
                  <th className="sortable-column">
                    <div className="column-header">
                      <span className="column-title">
                        {t("TableTitles.Status")}
                      </span>
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
                    </div>
                  </th>
                  <th>{t("TableTitles.Ver")}</th>
                  <th>{t("TableTitles.Descargar")}</th>
                  <th>{t("TableTitles.Archivos")}</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((producto) => (
                  <ProductsTable
                    key={uuidv4()}
                    producto={producto}
                    onClick={fetchResults}
                    setSingleProducto={setSingleProducto}
                    setActiveSection={setActiveTab}
                  />
                ))}
              </tbody>
            </table>
            <ReactPaginate
              className="pagination"
              pageClassName="pagination__page"
              activeClassName="active"
              disabledClassName="disabled"
              previousClassName="pagination__previous"
              nextClassName="pagination__next"
              breakClassName="pagination__break"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      )}
      {activeTab === "archivos" && <Archivos singleProducto={singleProducto} />}
      {activeTab === "informacion" && <Informacion />}
      {activeTab === "detalle" &&  singleProducto && (<ProductDetail singleProducto={singleProducto} />)}
    </>
  );
};

export default Results;
