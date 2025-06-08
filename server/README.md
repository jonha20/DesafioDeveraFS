[⬅️ Volver al README principal](../README.MD)

# 🔧 Backend - Devera

Este backend alimenta la aplicación **Devera**, una solución web que permite a marcas medir, visualizar y comunicar el impacto ambiental de sus productos. Se trata de una API RESTful con autenticación JWT, base de datos PostgreSQL y documentación Swagger.

![Node + express](/client/src/assets/images/node+express-removebg-preview.png)

## 📦 Tecnologías principales

| Función             | Librerías / Tecnologías principales                            |
|---------------------|------------------------------------------------------------------|
| Framework           | `express@5.1.0`, `pg`                                            |
| Base de datos       | **PostgreSQL** (consultas SQL directas vía `pg`)               |
| Seguridad           | `helmet`, `cors`, `cookie-parser`, `jsonwebtoken`              |
| Autenticación       | `jsonwebtoken`, `bcrypt`                                        |
| Desarrollo          | `nodemon`, `concurrently`, `dotenv`                             |
| Documentación       | `swagger-ui-express`                                            |
| Logs                | `morgan`                                                        |


## 🛢️ Modelo de datos

![Tablas modelo datos](/client/src/assets/images/tablas-modelo-datos.png)

## 🩻 Estructura del proyecto

```
📁 server
├── 📁 config  
│    └── sqlConfig              
├── 📁 controllers   
│    ├── form.controller
│    ├── productos_impacto.controller
│    └── users.controller    
├── 📁 middlewares       
│    └── auth     
├── 📁 models   
│    ├── form.model
│    ├── productos_impacto.model 
│    └── users.models    
├── 📁 node_modules
├── 📁 routes 
│    ├── form.routes
│    ├── productos_impacto.routes  
│    └── users.routes          
├── 📁 utils  
│    ├── queries
│    └── regex
├── ⚙️ .env    
├── {} package-lock.json 
├── {} package.json
├── 📖 README.md
├── ⛓️ server.js            
└── {} swaggger.json                       
```

## 🌐 Endpoints disponibles

### Usuarios – ```/users```
```POST /register``` – Registro de nuevos usuarios

```POST /login``` – Autenticación (JWT)

```POST /logout``` – Cierre de sesión

```POST /refresh-token``` – Renovación de token

```POST /recoverpassword``` – Enlace de recuperación

```POST /restorepassword``` – Cambiar contraseña con token

### Productos – ```/productos_impacto```
```GET /:id_brand``` – Listado de productos por marca

```POST /``` – Crear nuevo producto

### Formularios – ```/form``` (protegido)
```POST /``` – Enviar formulario de sostenibilidad
<hr>

## 🧾 Swagger – Documentación de la API
 La API se documenta siguiendo el estándar OpenAPI v3 y puede consultarse localmente en:
```bash
 https://desafiodeverafs.onrender.com/docs
 ```
Incluye:

- Schemas validados (ProductInput, FormInput)

- Descripciones y ejemplos

- Códigos de estado y errores esperados

## 🛡️ Seguridad
- Validación JWT (access + refresh tokens)

- Cookies configuradas (secure, httpOnly, sameSite)

- Encriptación de contraseñas con bcrypt

- Middleware de autenticación para proteger rutas sensibles

- Helmet configurado para cabeceras seguras

## 🛠️ Instalación local

1. Instala dependencias

```bash
npm install
```
2. Crea tu archivo .env con tus variables de entorno
```bash
PORT=3000
JWT_SECRET=claveUltraSegura
JWT_REFRESH_SECRET=claveRefresco
NODE_ENV=development
```
3. Arranca el servidor
```bash
npm run dev
```
## ✅ Estado actual
 - Registro/login con JWT

 - CRUD básico de productos por marca

 - Envío validado de formularios de sostenibilidad

 - Recuperación de contraseña con token temporal
 
