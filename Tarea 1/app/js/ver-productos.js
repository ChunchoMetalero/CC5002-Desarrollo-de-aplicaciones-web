fetch("../listado-productos.json")
    .then((response) => response.json())
    .then((data) => {
        const productos = data.productos;
        const listaProductos = document.getElementById("lista-productos");
        productos.forEach((producto) => {
            const td = document.createElement("td");
            td.textContent = producto.nombre;
            listaProductos.appendChild(td);
        });
    });