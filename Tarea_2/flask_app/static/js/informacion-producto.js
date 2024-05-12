let producto = localStorage.getItem("producto");
        if (producto) {
            // Convertir el JSON a objeto JavaScript
            producto = JSON.parse(producto);
            console.log(producto[0]);

            // Mostrar los datos del producto en la página
            document.getElementById("tipoProducto").textContent = producto[0].tipo;
            document.getElementById("nombreProducto").textContent = producto[0].frutas_verduras.join(", ");
            document.getElementById("descripcionProducto").textContent = producto[0].descripcion;
            document.getElementById("regionProducto").textContent = producto[0].region;
            document.getElementById("comunaProducto").textContent = producto[0].comuna;
            document.getElementById("productorProducto").textContent = producto[0].productor;
            document.getElementById("emailProducto").textContent = producto[0].email;
            if (producto[0].telefono == "") {
                document.getElementById("telefonoProducto").textContent = "No disponible";
            } else {
                document.getElementById("telefonoProducto").textContent = producto[0].telefono;
            }
            // Agrega más líneas para los otros campos del producto (precio, cantidad, categoría, etc.)

            // Si tienes la URL de la imagen, puedes establecerla así:
            
            for (let i = 0; i < producto[0].fotos.length; i++) {
                let foto = producto[0].fotos[i];
                let img = document.createElement("img");
                img.src = foto.ruta + "/640x480/" + foto.nombre_foto;
                img.id = "imagenProducto-" + i;
                img.alt = "Imagen del Producto";
                img.classList.add("imagen");
                img.addEventListener('click', function() {
                    resize(img.id, foto);
                });
                div = document.getElementById("imagenProducto")
                div.appendChild(img);
            }
        }

function resize(id, foto) {
    let imagen = document.getElementById(id);
    if (imagen.width == 640) {
        imagen.src = foto.ruta + "/1280x1024/" + foto.nombre_foto;
    } else {
        imagen.src = foto.ruta + "/640x480/" + foto.nombre_foto;
    }
}