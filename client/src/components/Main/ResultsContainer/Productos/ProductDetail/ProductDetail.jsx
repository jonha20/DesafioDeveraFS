import React, {useState} from "react";
import HeadProduct from "./HeadProduct/HeadProduct";
import InfoProducto from "./InfoProduct/InfoProduct";
import NavDetailProduct from "./NavDetailProduct/NavDetailProduct";

const ProductDetail = ({ singleProducto }) => {
const [activeTab, setActiveTab] = useState("resumen");

  return <div>
    <HeadProduct productData={singleProducto} />
    <NavDetailProduct setActiveTab={setActiveTab} activeTab={activeTab} />
    <InfoProducto activeTab={activeTab} productData={singleProducto} />

  </div>;
};

export default ProductDetail;
