const express = require("express");
const router = express.Router();
const { getAllProducts} = require('../controllers/tabla.controller');

router.get("/table", getAllProducts);

module.exports = router;