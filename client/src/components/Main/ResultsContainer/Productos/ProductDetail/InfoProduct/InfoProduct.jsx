import React, { useContext, useEffect, useState } from "react";
import Comparativa from "./Comparativa/Comparativa";
import Conclusiones from "./Conclusiones/Conclusiones";
import DetalleCategorias from "./DetalleCategorias/DetalleCategorias";
import InformacionMarketing from "./InformacionMarketing/InformacionMarketing";
import Resumen from "./Resumen/Resumen";
import SostenibilidadMarca from "./SotenibilidadMarca/SotenibilidadMarca";
import { UserContext } from "@/src/context/userContext";
import axios from "axios";

const InfoProduct = ({ activeTab, productData }) => {
  const { productoAnalizado } = useContext(UserContext);
  const [jsonData, setJsonData] = useState([]);
  const [dataToUse, setDataToUse] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("/products_detail.json");
        setJsonData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJsonData([]);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    // Actualiza dataToUse cada vez que productoAnalizado cambie
    if (productoAnalizado && Array.isArray(productoAnalizado) && productoAnalizado.length > 0) {
      setDataToUse(productoAnalizado);
    } else {
      setDataToUse(jsonData);
    }
  }, [productoAnalizado, jsonData]);


  return (
    <>
      {activeTab === "resumen" && <Resumen jsonData={dataToUse} productData={productData}/>}
      {activeTab === "comparativa" && <Comparativa jsonData={dataToUse} productData={productData} />}
      {activeTab === "conclusiones" && <Conclusiones jsonData={dataToUse} productData={productData}/>}
      {activeTab === "detalle_categorias" && <DetalleCategorias jsonData={dataToUse} productData={productData} />}
      {activeTab === "informacion_marketing" && <InformacionMarketing jsonData={dataToUse} productData={productData} />}
      {activeTab === "sostenibilidad_marca" && <SostenibilidadMarca jsonData={dataToUse} productData={productData}/>}
    </>
  );
};

export default InfoProduct;