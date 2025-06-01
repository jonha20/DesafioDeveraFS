const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct} = require('../controllers/productos_impacto.controller');

router.get("/", getAllProducts);

router.post("/", createProduct);

module.exports = router;