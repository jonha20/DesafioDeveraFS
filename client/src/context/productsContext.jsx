import React, { createContext, useState, useContext } from "react";

// Crear contexto
const ProductsContext = createContext();

//Crear el provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};


export const useProducts = () => useContext(ProductsContext);