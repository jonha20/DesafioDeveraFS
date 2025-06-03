import React from "react";
import HeadProduct from "./HeadProduct/HeadProduct";
import NavDetailProduct from "./NavDetailProduct/NavDetailProduct";


const ProductDetail = ({ singleProducto }) => {
const [activeTab, setActiveTab] = useState("resumen");
  return <div>
    <HeadProduct productData={singleProducto} />

    <NavDetailProduct setActiveTab={setActiveTab} activeTab={activeTab} />

  </div>;
};

export default ProductDetail;
