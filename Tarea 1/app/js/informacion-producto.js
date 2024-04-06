var producto = localStorage.getItem("producto");
        if (producto) {
            // Convertir el JSON a objeto JavaScript
            producto = JSON.parse(producto);

            // Mostrar los datos del producto en la página
            document.getElementById("tipoProducto").textContent = producto.tipo;
            document.getElementById("nombreProducto").textContent = producto.productos.join(", ");
            document.getElementById("descripcionProducto").textContent = producto.Descripcion;
            document.getElementById("regionProducto").textContent = producto.region;
            document.getElementById("comunaProducto").textContent = producto.comuna;
            document.getElementById("productorProducto").textContent = producto.productor;
            document.getElementById("emailProducto").textContent = producto.email;
            document.getElementById("telefonoProducto").textContent = producto.telefono;
            // Agrega más líneas para los otros campos del producto (precio, cantidad, categoría, etc.)

            // Si tienes la URL de la imagen, puedes establecerla así:
            document.getElementById("imagenProducto").src = producto.img640;
        }

document.getElementById("imagenProducto").addEventListener('click', function() {
    console.log('Click en la imagen del producto');
    document.getElementById("imagenProducto").src = producto.img1280;
});


    


