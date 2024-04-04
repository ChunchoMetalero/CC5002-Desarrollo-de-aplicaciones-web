var tbody = document.getElementById("lista-productos");

// Realizar una solicitud HTTP GET para obtener el archivo JSON
fetch("../data/listado-productos.json")
    .then(response => response.json())
    .then(data =>{
        // Recorrer los datos y agregar filas a la tabla
        data.forEach(function(producto) {
            var fila = "<tr>";
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
