const express = require("express");
const router = express.Router();
const { register, login, logout, refreshToken, handleRecoverPassword, handleRestorePassword } = require('../controllers/users.controllers');
//const auth = require("../middlewares/auth.middleware");


// Registrar usuario
router.post("/register", register);

// Iniciar sesión
router.post("/login", login);

// Cerrar sesión
router.post("/logout", logout);

// Refrescar token

router.post("/refresh-token", refreshToken);

// Recuperar contraseña
router.post('/recoverpassword', handleRecoverPassword);

// Restaurar contraseña
router.post('/restorepassword', handleRestorePassword);

module.exports = router;
