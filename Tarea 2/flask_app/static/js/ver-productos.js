let tbody = document.getElementById("lista-productos");
let actualPage = 1;
let cantidadProductos = 0;
// Realizar una solicitud HTTP GET para obtener el archivo JSON

function numberPages(cantidadProductos){
    if (cantidadProductos % 5 === 0){
        return cantidadProductos / 5;
    } else {
        return Math.floor(cantidadProductos / 5) + 1;
    }   
}

function getProductos(page) {
    fetch("/get-productos?page=" + actualPage)
        .then(response => response.json())
        .then(data =>{
            tbody.innerHTML = "";
            data.forEach(function(producto){
                let fila = "<tr onClick='mostrarInformacionProducto(" + producto.id_prod + ")'>";
                fila += "<td>" + producto.tipo + "</td>";
                fila += "<td>" + producto.frutas_verduras.join(", ") + "</td>";
                fila += "<td>" + producto.region + "</td>";
                fila += "<td>" + producto.comuna + "</td>";
                let primeraFoto = producto.fotos[0];
                fila += "<td><img src='" + primeraFoto.ruta + "/" + primeraFoto.nombre_foto + "' alt='Product Image' height='120px' width='120px'></td>";
                fila += "</tr>";
                cantidadProductos = producto.cantidad;

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
    fetch("/producto?id_prod=" + productId)
        .then(response => response.json())
        .then(data => {
            // Buscar el producto en el arreglo de productos
            let producto = data;
            // Guardar los datos del producto en el localStorage
            localStorage.setItem("producto", JSON.stringify(producto));
            // Redirigir a la página de información del producto
            window.location.href = "/informacion-producto";
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}

function nextPage() {
    if (actualPage < numberPages(cantidadProductos)) { 
        actualPage++;
        let top_number = document.getElementById("numero-pagina-top");
        let bottom_number = document.getElementById("numero-pagina-bottom");
        top_number.innerText = actualPage;
        bottom_number.innerText = actualPage;
        getProductos(actualPage);
        console.log(cantidadProductos);
    }
    else {
        console.log("No hay más páginas");
    }
}

function previousPage() {
    if (actualPage > 1) {
        actualPage--;
        let top_number = document.getElementById("numero-pagina-top");
        let bottom_number = document.getElementById("numero-pagina-bottom");
        top_number.innerText = actualPage;
        bottom_number.innerText = actualPage;
        getProductos(actualPage);
    }
}

getProductos(actualPage);

document.getElementById("pagina-siguiente-top").addEventListener("click", nextPage);
document.getElementById("pagina-anterior-top").addEventListener("click", previousPage);
document.getElementById("pagina-siguiente-bottom").addEventListener("click", nextPage);
document.getElementById("pagina-anterior-bottom").addEventListener("click", previousPage);

