import React, {useState} from "react";
import axios from "axios";
import Comparativa from "./Comparativa/Comparativa";
import Conclusiones from "./Conclusiones/Conclusiones";
import DetalleCategorias from "./DetalleCategorias/DetalleCategorias";
import InformacionMarketing from "./InformacionMarketing/InformacionMarketing";
import Resumen from "./Resumen/Resumen";
import SostenibilidadMarca from "./SotenibilidadMarca/SotenibilidadMarca";

const InfoProduct = ({activeTab, productData}) => {
const [jsonData, setJsonData] = useState([]);
const getData = async () => {
  try {
    const response = await axios.get(
      `/products_detail.json` 
    );
    setJsonData(response.data);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}
getData();

  return (
  <>
    {activeTab === "resumen" && <Resumen jsonData={jsonData} />}
    {activeTab === "comparativa" && <Comparativa jsonData={jsonData} />}
    {activeTab === "conclusiones" && <Conclusiones jsonData={jsonData} />}
    {activeTab === "detalle_categorias" && <DetalleCategorias jsonData={jsonData} productData={productData}/>}
    {activeTab === "informacion_marketing" && <InformacionMarketing jsonData={jsonData} />}
    {activeTab === "sostenibilidad_marca" && <SostenibilidadMarca jsonData={jsonData} />}
  </>
  );
};

export default InfoProduct;
