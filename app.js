const express = require("express");
const app = express();
const path = require("path");
const productos = require("./productos.json");

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/productos", (req, res) => {
  res.json(productos);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Solo escuchar si ejecutas node app.js directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Mini tienda corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
