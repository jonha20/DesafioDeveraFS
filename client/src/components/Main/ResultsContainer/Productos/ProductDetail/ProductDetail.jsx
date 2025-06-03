import React from "react";
import HeadProduct from "./HeadProduct/HeadProduct";

const ProductDetail = ({ singleProducto }) => {

  return <div>
    <HeadProduct productData={singleProducto} />
  </div>;
};

export default ProductDetail;
