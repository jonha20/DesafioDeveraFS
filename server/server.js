const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(express.json());
const helmet = require('helmet'); // Importamos helmet para seguridad
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set('trust proxy', 1); // Habilitar el proxy para HTTPS

app.use(cors({
  origin: [
    "https://deveraai.netlify.app",
    "http://localhost:5173",
  ],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client')));

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/ready', (req, res) => {
  res.send('Server Ready!');
});
const userRoutes = require('./routes/users.routes');
const tableRoutes = require('./routes/productos_impacto.routes');
const formRoutes = require("./routes/form.routes")

app.use('/users', userRoutes);
app.use('/productos_impacto', tableRoutes);
app.use("/form", formRoutes);



app.listen(port, () => {
  console.log(`Servidor iniciado`);
});