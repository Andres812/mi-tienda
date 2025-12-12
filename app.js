require("dotenv").config(); // Permite leer variables de entorno

const express = require("express");
const app = express();
const path = require("path");
const productos = require("./productos.json");

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Endpoint API
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Escuchar cuando el archivo se ejecuta directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Mini tienda corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
