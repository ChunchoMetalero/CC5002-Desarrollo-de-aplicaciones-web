var tbody = document.getElementById("lista-productos");

// Realizar una solicitud HTTP GET para obtener el archivo JSON
fetch("../data/listado-productos.json")
    .then(response => response.json())
    .then(data =>{
        // Recorrer los datos y agregar filas a la tabla
        data.forEach(function(producto) {
            var fila = "<tr onClick='mostrarInformacionProducto(" + producto.id + ")'>";
            fila += "<td>" + producto.tipo + "</td>";
            fila += "<td>" + producto.productos.join(", ") + "</td>";
            fila += "<td>" + producto.region + "</td>";
            fila += "<td>" + producto.comuna + "</td>";
            fila += "<td><img src='" + producto.imagen + "' alt='Product Image' width='120' height='120'></td>";
            fila += "</tr>";

            // Agregar la fila al tbody de la tabla
            tbody.innerHTML += fila;
        });
    })
    .catch(function(error) {
        console.error('Error fetching the JSON file:', error);
    });


function mostrarInformacionProducto(productId) {
    console.log("Esto funciona");
    console.log("Producto seleccionado: " + productId);
    // Obtener los datos del producto correspondiente al ID
    fetch("../data/listado-productos.json")
        .then(response => response.json())
        .then(data => {
            // Buscar el producto en el arreglo de productos
            var producto = data.find(producto => producto.id == productId);
            // Guardar los datos del producto en el localStorage
            localStorage.setItem("producto", JSON.stringify(producto));
            // Redirigir a la página de información del producto
            window.location.href = "informacion-producto.html";
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}
    
