const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(express.json());


app.set('trust proxy', 1); // Habilitar el proxy para HTTPS

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:80",
    "http://localhost",
    "https://deveraai.netlify.app/"
  ],
  credentials: true
}));

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

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});