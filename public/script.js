fetch("/api/productos")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor-productos");
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.nombre}</h3>
        <p>Id: ${p.id}</p>
        <span>$${p.precio}</span>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error cargando productos:", err);
  });
