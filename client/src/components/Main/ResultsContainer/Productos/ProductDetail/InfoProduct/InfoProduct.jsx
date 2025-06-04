import React, {useContext, useEffect, useState} from "react";
import Comparativa from "./Comparativa/Comparativa";
import Conclusiones from "./Conclusiones/Conclusiones";
import DetalleCategorias from "./DetalleCategorias/DetalleCategorias";
import InformacionMarketing from "./InformacionMarketing/InformacionMarketing";
import Resumen from "./Resumen/Resumen";
import SostenibilidadMarca from "./SotenibilidadMarca/SotenibilidadMarca";
import { UserContext } from "@/src/context/userContext";
import axios from "axios";

const InfoProduct = ({activeTab, productData}) => {
  const { productoAnalizado } = useContext(UserContext);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => { 
    const fetchProductData = async () => {
      axios.get("/products_detail.json")
        .then((response) => {
          setJsonData(response.data);
          return response;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return { data: [] };
        });
    }
    fetchProductData();
  }, []);

  // Usa productoAnalizado si existe y tiene elementos, si no usa jsonData
  const dataToUse = Array.isArray(productoAnalizado) && productoAnalizado.length > 0
    ? productoAnalizado
    : jsonData;

  return (
    <>
      {activeTab === "resumen" && <Resumen jsonData={dataToUse} />}
      {activeTab === "comparativa" && <Comparativa jsonData={dataToUse} productData={productData}/>}
      {activeTab === "conclusiones" && <Conclusiones jsonData={dataToUse} />}
      {activeTab === "detalle_categorias" && <DetalleCategorias jsonData={dataToUse} productData={productData}/>}
      {activeTab === "informacion_marketing" && <InformacionMarketing jsonData={dataToUse} productData={productData} />}
      {activeTab === "sostenibilidad_marca" && <SostenibilidadMarca jsonData={dataToUse} />}
    </>
  );
};

export default InfoProduct;