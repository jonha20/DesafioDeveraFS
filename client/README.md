[⬅️ Volver al README principal](../README.md)

# Frontend - Devera

Este es el frontend de la aplicación Devera, realizado íntegramente con React y otras librerías para mejorar la experiencia de usuario y la usabilidad de la interfaz.

![Logo React](/client/src/assets/images/react-gif-2.gif)

## 🌐 Despliegue en producción
🔗 [https://deveraai.netlify.app/login](https://deveraai.netlify.app/login)

## 🖥️ Tecnologías y librerías principales
- **React 19** + **React Router DOM 7 – SPA** con navegación dinámica

- **Vite** – Bundler ultrarrápido para desarrollo y producción

- **MUI (Material UI)** – Librería de componentes UI moderna

- **AG Grid** – Tabla interactiva y potente para visualización de datos

- **Chart.js** (via react-chartjs-2) – Visualización gráfica de impacto

- **i18next** + **react-i18next** – Internacionalización ES/EN

- **Firebase** – Gestión de autenticación y/o almacenamiento (opcional)

- **Axios** – Cliente HTTP para consumir la API de backend

- **SweetAlert2** – Diálogos modernos y personalizables

- **React Dropzone** – Subida de archivos para datos de productos

- **React Toastify** – Notificaciones amigables y contextualizadas

- **uuid**, **jwt-decode**, **js-cookie** – Utilidades para sesión, token y cookies

## 🩻 Estructura de la Aplicación

```hash
📁 client
├── 📁 node_modules
├── 📁 public
├── 📁 src
│       ├── 📁 assets
│       ├── 📁 components
│       │     ├── Header
│       │     ├── Main
│       │     └── Footer
│       │        
│       ├── 📁 context
│       ├── 📁 locales
│       ├── 📁 Pages
│       ├── 📁 styles
│       ├── App.jsx
│       ├── i18n.js
│       └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── <> index.html
├── {} package-lock.json
├── {} package.json
├── 📖 README.MD
└── vite.config.js
```

## 🚀 Iniciar el proyecto

### 1. Instala dependencias

```bash
npm install
```

### 2. Configurar entorno
Crea un archivo .env basado en .env.example, y define:

```hash
VITE_API_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=...
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 4. Build en producción

```bash
npm run build
```

## 🧭 Flujo de usuario

| Sección              | Descripción breve                                                       |
| -------------------- | ----------------------------------------------------------------------- |
| **Login/Register**   | Autenticación y validación por rol (usuario, admin)                     |
| **Onboarding**       | Integración de formulario para recopilación de datos                     |
| **Dashboard**        | AG Grid para listar productos analizados (búsqueda, orden, exportación) |
| **Detalle producto** | Visualización gráfica de impacto, comparativas, exportación en PDF      |
| **Perfil / Logout**  | Gestión de sesión y opciones de usuario                                 |

![Gif interfaz usuario](/client/src/assets/images/gif-interfaz-front.gif)

## 📊 Visualización de datos
- chart.js y react-chartjs-2: gráficos circulares, líneas y barras

- Personalización adaptada a branding de Devera

- Módulo de exportación PDF con cloudconvert y exportación de tablas a Excel con xlsx

## 🌍 Internacionalización (i18n)
Configurado con:

- i18next

- react-i18next

- i18next-browser-languagedetector

Lenguajes disponibles:

- es (Español)

- en (Inglés)

El idioma puede cambiarse desde el menú de usuario.

![Gif cambio idioma](/client/src/assets/images/cambio-idioma.gif)
