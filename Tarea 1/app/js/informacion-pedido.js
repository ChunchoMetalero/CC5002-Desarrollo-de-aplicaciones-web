var pedido = localStorage.getItem("pedido");
        if (pedido) {
            // Convertir el JSON a objeto JavaScript
            pedido = JSON.parse(pedido);

            // Mostrar los datos del pedido en la página
            document.getElementById("tipoPedido").textContent = pedido.tipo;
            document.getElementById("productosPedido").textContent = pedido.productos.join(", ");
            document.getElementById("descripcionPedido").textContent = pedido.descripcion;
            document.getElementById("regionPedido").textContent = pedido.region;
            document.getElementById("comunaPedido").textContent = pedido.comuna;
            document.getElementById("compradorPedido").textContent = pedido.comprador;
            document.getElementById("emailPedido").textContent = pedido.emailComprador;
            document.getElementById("telefonoPedido").textContent = pedido.telefonoComprador;
        }

document.getElementById("imagenpedido").addEventListener('click', function() {
    console.log('Click en la imagen del pedido');
    document.getElementById("imagenpedido").src = pedido.img1280;
});


    


