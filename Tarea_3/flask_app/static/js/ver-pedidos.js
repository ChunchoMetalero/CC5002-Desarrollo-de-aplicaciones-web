let tbody = document.getElementById("lista-pedidos");
let actualPage = 1;
let cantidadProductos = 0;

function numberPages(cantidadProductos) {
    if (cantidadProductos % 5 === 0) {
        return cantidadProductos / 5;
    } else {
        return Math.floor(cantidadProductos / 5) + 1;
    }   
}

function getPedidos(page) {
    fetch("/get-pedidos?page=" + actualPage)
        .then(response => response.json())
        .then(data =>{
            tbody.innerHTML = "";
            data.forEach(function(pedido){
                let fila = "<tr onClick='mostrarInformacionpedido(" + pedido.id_pedido + ")'>";
                fila += "<td>" + pedido.tipo + "</td>";
                fila += "<td>" + pedido.frutas_verduras.join(", ") + "</td>";
                fila += "<td>" + pedido.region + "</td>";
                fila += "<td>" + pedido.comuna + "</td>";
                fila += "<td>" + pedido.nombre_comprador + "</td>";
                fila += "</tr>";
                cantidadProductos = pedido.cantidad;

                // Agregar la fila al tbody de la tabla
                tbody.innerHTML += fila;

            });
        })
        .catch(function(error) {
            console.error('Error fetching the JSON file:', error);
        });
}

function mostrarInformacionpedido(pedido_id) {
    // Obtener los datos del pedido correspondiente al ID
    fetch("pedido?id_pedido=" + pedido_id)
        .then(response => response.json())
        .then(data => {
            // Buscar el pedido en el arreglo de pedidos
            let pedido = data;
            // Guardar los datos del pedido en el localStorage
            localStorage.setItem("pedido", JSON.stringify(pedido));
            // Redirigir a la página de información del pedido
            window.location.href = "/informacion-pedido";
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
        getPedidos(actualPage);
    }
}

function previousPage() {
    if (actualPage > 1) {
        actualPage--;
        let top_number = document.getElementById("numero-pagina-top");
        let bottom_number = document.getElementById("numero-pagina-bottom");
        top_number.innerText = actualPage;
        bottom_number.innerText = actualPage;
        getPedidos(actualPage);
    }
}

getPedidos(actualPage);

document.getElementById("pagina-siguiente-top").addEventListener("click", nextPage);
document.getElementById("pagina-anterior-top").addEventListener("click", previousPage);
document.getElementById("pagina-siguiente-bottom").addEventListener("click", nextPage);
document.getElementById("pagina-anterior-bottom").addEventListener("click", previousPage);