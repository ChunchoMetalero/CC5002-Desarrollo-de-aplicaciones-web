var tbody = document.getElementById("lista-pedidos");

// Realizar una solicitud HTTP GET para obtener el archivo JSON
fetch("../data/listado-pedidos.json")
    .then(response => response.json())
    .then(data =>{
        // Recorrer los datos y agregar filas a la tabla
        data.forEach(function(pedido) {
            var fila = "<tr onClick='mostrarInformacionpedido(" + pedido.id + ")'>";
            fila += "<td>" + pedido.tipo + "</td>";
            fila += "<td>" + pedido.productos.join(", ") + "</td>";
            fila += "<td>" + pedido.region + "</td>";
            fila += "<td>" + pedido.comuna + "</td>";
            fila += "<td>" + pedido.comprador + "</td>";
            fila += "</tr>";

            // Agregar la fila al tbody de la tabla
            tbody.innerHTML += fila;
        });
    })
    .catch(function(error) {
        console.error('Error fetching the JSON file:', error);
    });


function mostrarInformacionpedido(productId) {
    console.log("Esto funciona");
    console.log("pedido seleccionado: " + productId);
    // Obtener los datos del pedido correspondiente al ID
    fetch("../data/listado-pedidos.json")
        .then(response => response.json())
        .then(data => {
            // Buscar el pedido en el arreglo de pedidos
            var pedido = data.find(pedido => pedido.id == productId);
            // Guardar los datos del pedido en el localStorage
            localStorage.setItem("pedido", JSON.stringify(pedido));
            // Redirigir a la página de información del pedido
            window.location.href = "informacion-pedido.html";
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}
    
