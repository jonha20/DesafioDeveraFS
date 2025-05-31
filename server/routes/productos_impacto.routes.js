const express = require("express");
const router = express.Router();
const { getAllProducts} = require('../controllers/productos_impacto.controller');

router.get("/", getAllProducts);

module.exports = router;