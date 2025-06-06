const querieProduct = require("../models/productos_impacto.model");

const getAllProducts = async (req, res) => {
   const { id_brand } = req.params;
  try {
    const products = await querieProduct.getAllProducts(id_brand);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

const createProduct = async (req, res) => {
  const { product_name, href , id_brand, links, img_url} = req.body;
  if (!product_name || !href) {
    return res.status(400).json({ error: "Faltan datos del producto" });
  }

  try {
    const newProduct = await querieProduct.createProduct({ product_name, href, id_brand , links ,img_url});
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
}

module.exports = {
  getAllProducts,
  createProduct
};
