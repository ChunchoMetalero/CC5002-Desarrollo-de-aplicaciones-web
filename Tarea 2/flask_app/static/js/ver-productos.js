let tbody = document.getElementById("lista-productos");
let actualPage = 1;

// Realizar una solicitud HTTP GET para obtener el archivo JSON

function getProductos(page) {
    fetch("/get-productos?page=1")
        .then(response => response.json())
        .then(data =>{
            data.forEach(function(producto){
                let fila = "<tr onClick='mostrarInformacionProducto(" + producto.id_prod + ")'>";
                fila += "<td>" + producto.tipo + "</td>";
                fila += "<td>" + producto.frutas_verduras.join(", ") + "</td>";
                fila += "<td>" + producto.region + "</td>";
                fila += "<td>" + producto.comuna + "</td>";
                let primeraFoto = producto.fotos[0];
                fila += "<td><img src='" + primeraFoto.ruta + "/" + primeraFoto.nombre_foto + "' alt='Product Image' height='120px' width='120px'></td>";
                fila += "</tr>";

                // Agregar la fila al tbody de la tabla
                tbody.innerHTML += fila;
            
            });
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}

function mostrarInformacionProducto(productId) {
    // Obtener los datos del producto correspondiente al ID
    fetch("../data/listado-productos.json")
        .then(response => response.json())
        .then(data => {
            // Buscar el producto en el arreglo de productos
            let producto = data.find(producto => producto.id == productId);
            // Guardar los datos del producto en el localStorage
            localStorage.setItem("producto", JSON.stringify(producto));
            // Redirigir a la página de información del producto
            window.location.href = "informacion-producto.html";
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}


document.getElementById("pagina-anterior").addEventListener("click", function() {
    if (actualPage > 1) {
        actualPage--;
        document.getElementById("numero-pagina").textContent = actualPage;
        obtenerProductos(actualPage);
    }
});

document.getElementById("pagina-siguiente").addEventListener("click", function() {
    actualPage++;
    document.getElementById("numero-pagina").textContent = actualPage;
    obtenerProductos(actualPage);
});

getProductos(actualPage);
    
