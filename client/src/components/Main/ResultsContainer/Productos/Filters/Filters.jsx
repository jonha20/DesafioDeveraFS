import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import { utils } from "xlsx";

const Filters = ({setFilterProducto}) => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedText] = useDebounce(search, 2000);
  console.log("Search text:", search);
  console.log (entries)



  useEffect(() => {
    // Aquí podrías hacer algo con el texto debounced, como filtrar resultados
    console.log("Debounced search text:", debouncedText);
    setFilterProducto(debouncedText);
  }, [debouncedText]);

const handleChange = (e) => {
    setSearch(e.target.value);
  };


  const exportToCSV = () => {
    const workSheet = utils.json_to_sheet(data);
    const csv = utils.sheet_to_csv(workSheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    csvLink.current.href = url;
    csvLink.current.download = "products.csv";
    csvLink.current.click();
    window.URL.revokeObjectURL(url);
  };

  return <>
  
    <div className="filters">
      <div className="filters__left">
        <label htmlFor="entries" className="filters__label">{t("Filter.show")}</label>
        <select id="entries" className="filters__select" value={entries} onChange={(e) => setEntries(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span className="filters__label">{t("Filter.entries")}</span>
      </div>
      <div className="filters__center"></div>
      <div className="filters__right">
        <div className="filters__search">
          <span className="filters__search-icon">&#128269;</span>
          <input
            type="text"
            className="filters__input"
            placeholder={t("Filter.SearchPlaceholder")}
            value={search}
            onChange={handleChange} 
            />
        </div>
        <a href="#" className="filters__export" onClick={e => { e.preventDefault(); exportToCSV(); }}>
            <span role="img" aria-label="export" className="filters__export-icon">&#128190;</span>
            <div className="filters__export__text">{t("Filter.export")}</div>
          </a>

          {/* Enlace oculto para descarga */}
          <a ref={csvLink} style={{display: "none"}}></a>
      </div>
    </div>

  </>;
};

export default Filters;
