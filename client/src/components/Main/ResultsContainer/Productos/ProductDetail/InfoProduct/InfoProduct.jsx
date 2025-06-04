import React, {useContext} from "react";
import axios from "axios";
import Comparativa from "./Comparativa/Comparativa";
import Conclusiones from "./Conclusiones/Conclusiones";
import DetalleCategorias from "./DetalleCategorias/DetalleCategorias";
import InformacionMarketing from "./InformacionMarketing/InformacionMarketing";
import Resumen from "./Resumen/Resumen";
import SostenibilidadMarca from "./SotenibilidadMarca/SotenibilidadMarca";
import { UserContext } from "@/src/context/userContext";

const InfoProduct = ({activeTab, productData}) => {
const { productoAnalizado } = useContext(UserContext);


  return (
  <>
    {activeTab === "resumen" && <Resumen jsonData={productoAnalizado} />}
    {activeTab === "comparativa" && <Comparativa jsonData={productoAnalizado} productData={productData}/>}
    {activeTab === "conclusiones" && <Conclusiones jsonData={productoAnalizado} />}
    {activeTab === "detalle_categorias" && <DetalleCategorias jsonData={productoAnalizado} productData={productData}/>}
    {activeTab === "informacion_marketing" && <InformacionMarketing jsonData={productoAnalizado} productData={productData} />}
    {activeTab === "sostenibilidad_marca" && <SostenibilidadMarca jsonData={productoAnalizado} />}

  </>
  );
};

export default InfoProduct;
