let pedido = localStorage.getItem("pedido");
        if (pedido) {
            // Convertir el JSON a objeto JavaScript
            pedido = JSON.parse(pedido);
            console.log(pedido);

            // Mostrar los datos del pedido en la página
            document.getElementById("tipoPedido").textContent = pedido[0].tipo;
            document.getElementById("productosPedido").textContent = pedido[0].frutas_verduras.join(", ");
            document.getElementById("descripcionPedido").textContent = pedido[0].descripcion;
            if (pedido[0].descripcion == "") {
                document.getElementById("descripcionPedido").textContent = "El comprador no ha dejado una descripción del pedido.";
            } else {
                document.getElementById("descripcionPedido").textContent = pedido[0].descripcion;
            }
            document.getElementById("regionPedido").textContent = pedido[0].region;
            document.getElementById("comunaPedido").textContent = pedido[0].comuna;
            document.getElementById("compradorPedido").textContent = pedido[0].nombre;
            document.getElementById("emailPedido").textContent = pedido[0].email;
            if (pedido[0].telefono == "") {
                document.getElementById("telefonoPedido").textContent = "No disponible";
            } else {
                document.getElementById("telefonoPedido").textContent = pedido[0].telefono;
            }
        }

document.getElementById("imagenpedido").addEventListener('click', function() {
    console.log('Click en la imagen del pedido');
    document.getElementById("imagenpedido").src = pedido.img1280;
});


    


