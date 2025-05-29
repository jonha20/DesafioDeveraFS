const express = require("express");
const router = express.Router();
const { register, login, logout } = require('../controllers/users.controllers');
//const auth = require("../middlewares/auth.middleware");



// Recuperar contraseña
// router.put('/recoverpassword', Userpgadmin.recoverPassword);

// Restaurar contraseña
// router.put('/restorepassword', Userpgadmin.restorePassword);

// Registrar usuario
router.post("/register", register);

// Iniciar sesión
router.post("/login", login);

// Cerrar sesión
router.post("/logout", logout);

// // Cambiar foto de perfil
// router.put('/photo/:id', upload.single('image'), Userpgadmin.changePhoto);


module.exports = router;
