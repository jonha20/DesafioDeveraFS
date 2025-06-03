import React from "react";
import NavDetailProduct from "./NavDetailProduct/NavDetailProduct";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("resumen");

  return <div>
    <NavDetailProduct setActiveTab={setActiveTab} activeTab={activeTab} />
  </div>;
};

export default ProductDetail;
