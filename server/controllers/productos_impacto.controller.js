const querieProduct = require("../models/productos_impacto.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await querieProduct.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

module.exports = {
  getAllProducts,
};
