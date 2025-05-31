const express = require("express");
const router = express.Router();
const { createForm } = require("../controllers/form.controller");
const auth = require("../middlewares/auth"); 

// Ruta protegida para enviar el formulario
router.post("/", createForm);

module.exports = router;