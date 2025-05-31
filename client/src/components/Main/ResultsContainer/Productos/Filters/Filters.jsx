import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import { utils } from "xlsx";

const Filters = ({setFilterProducto, data}) => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState(10);
  const csvLink = useRef(null);
  const [search, setSearch] = useState("");
  const [debouncedText] = useDebounce(search, 2000);



  useEffect(() => {
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


  return (
    <>
      <div className="filters">
        {/* Aquí puedes quitar el select si no quieres */}
        <div className="filters__left">
          <label className="filters__label">{t("Filter.show")}</label>
          <span className="filters__label">{t("Filter.entries")}</span>
        </div>
        <div className="filters__center"></div>
        <div className="filters__right">
          <div className="filters__search">
            <span className="filters__search-icon"><img src="/icons/search.svg" alt="search_svg" /></span>
            <input
              type="text"
              className="filters__input"
              placeholder={t("Filter.SearchPlaceholder")}
              value={search}
              onChange={handleChange}
            />
          </div>

          <a href="#" className="filters__export" onClick={e => { e.preventDefault(); exportToCSV(); }}>
            <span role="img" aria-label="export" className="filters__export-icon"><img src="/icons/file_save.svg" alt="search_svg" /></span>
            <div className="filters__export__text">{t("Filter.export")}</div>
          </a>

          {/* Enlace oculto para descarga */}
          <a ref={csvLink} style={{display: "none"}}></a>
        </div>
      </div>
    </>
  );
};

export default Filters;
