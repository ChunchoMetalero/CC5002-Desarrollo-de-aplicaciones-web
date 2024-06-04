//Validadores

let errores = [];

validarTipoProducto = (tipo) => {
    if (tipo === 'none') {
        errores.push('Debe seleccionar un tipo de producto');
        return false;
    }
    return true;
}

validarProductos = (productos) => {
    if (productos.length === 0) {
        errores.push('Debe seleccionar al menos un producto');
        return false;
    }
    if (productos.length > 5) {
        errores.push('Solo puede seleccionar hasta 5 productos');
        return false;
    }
    return true;
}

validarFotos = (fotos) => {
    const tiposPermitidos = ['image/jpeg', 'image/png']; // Tipos MIME permitidos
    const maxSize = 15000000; // Tamaño máximo permitido (en bytes)

    if (fotos.length === 0) {
        errores.push('Debe seleccionar al menos una foto');
        return false;
    }
    if (fotos.length > 3) {
        errores.push('Solo puede seleccionar hasta 3 fotos');
        return false;
    }
    
    let totalSize = 0;
    for (let i = 0; i < fotos.length; i++) {
        const foto = fotos[i];
        totalSize += foto.size;
        
        // Verificar el tipo MIME de la foto
        if (!tiposPermitidos.includes(foto.type)) {
            errores.push('El archivo "' + foto.name + '" no es una imagen válida');
            return false;
        }
    }
    if (totalSize > maxSize) {
        errores.push('El tamaño total de las fotos no puede superar los 15MB');
        return false;
    }
    return true;
}

validarRegion = (region) => {
    if (region === 'none') {
        errores.push('Debe seleccionar una región');
        return false;
    }
    return true;
}

validarComuna = (comuna) => {
    if (comuna === 'none') {
        errores.push('Debe seleccionar una comuna');
        return false;
    }
    return true;
}

validarNombreProductor = (nombre) => {
    // largo minimo 3 y maximo 80
    if (nombre.length < 3 || nombre.length > 80) {
        errores.push('Debe ingresar un nombre válido entre 3 y 80 caracteres');
        return false;
    }
    return true;
} 

validarCorreoProductor = (correo) => {
    // Cumpir formato correo electronico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(correo)) {
        errores.push('El correo electronico no es valido');
        return false;
    }
    return true;
}

validarTelefonoProductor = (telefono) => {
    // largo minimo 9 y maximo 15
    if (telefono.length === 0) {
        return true;
    }
    if (telefono.length < 9 || telefono.length > 15) {
        errores.push('El teléfono del productor debe tener entre 9 y 15 carácteres');
        return false;
    }
    // revisar que sean caracteres correspondientes a un numero de telefono
    const regex = /^[0-9]+$/;
    if (!regex.test(telefono)) {
        errores.push('El teléfono del productor debe contener solo números');
        return false;
    }
    return true;
}


validarAgregarProducto = () => {
    errores = []; // Reinicia el array de errores

    const tipo = document.getElementById('tipo-prod').value;
    let productos = document.querySelectorAll('input[name=Producto]:checked');
    const fotos = document.getElementById('imagen').files;
    const region = document.getElementById('region-select').value;
    const comuna = document.getElementById('comuna-select').value;
    const nombre = document.getElementById('nombre-prod').value;
    const correo = document.getElementById('email-prod').value;
    const telefono = document.getElementById('telefono-prod').value;

    let isValid = true;

    if (!validarTipoProducto(tipo)) isValid = false;
    if (!validarProductos(productos)) isValid = false;
    if (!validarFotos(fotos)) isValid = false;
    if (!validarRegion(region)) isValid = false;
    if (!validarComuna(comuna)) isValid = false;
    if (!validarNombreProductor(nombre)) isValid = false;
    if (!validarCorreoProductor(correo)) isValid = false;
    if (!validarTelefonoProductor(telefono)) isValid = false;

    return isValid;
}


validarAgregarPedido = () => {
    errores = []; // Reinicia el array de errores

    const tipo = document.getElementById('tipo-prod').value;
    let productos = document.querySelectorAll('input[name=Producto]:checked');
    const region = document.getElementById('region-select').value;
    const comuna = document.getElementById('comuna-select').value;
    const nombre = document.getElementById('nombre-comp').value;
    const correo = document.getElementById('email-comp').value;
    const telefono = document.getElementById('telefono-comp').value;

    console.log(tipo);
    console.log(productos);
    console.log(productos.length);
    console.log(region);
    console.log(comuna);
    console.log(nombre);
    console.log(correo);
    console.log(telefono);
    

    let isValid = true;

    if (!validarTipoProducto(tipo)) isValid = false;
    if (!validarProductos(productos)) isValid = false;
    if (!validarRegion(region)) isValid = false;
    if (!validarComuna(comuna)) isValid = false;
    if (!validarNombreProductor(nombre)) isValid = false;
    if (!validarCorreoProductor(correo)) isValid = false;
    if (!validarTelefonoProductor(telefono)) isValid = false;

    return isValid;
}


// Función para mostrar la alerta de error
function mostrarAlertaError(errors) {
    let errorAlert = document.getElementById("errorAlert");
    errorAlert.innerHTML = ""; // Limpiar el contenido anterior
    let ul = document.createElement('ul'); // Crear una lista sin orden
    errors.forEach(error => {
        let li = document.createElement('li'); // Crear un elemento de lista
        li.textContent = error;
        ul.appendChild(li); // Agregar el mensaje de error como elemento de lista
    });
    errorAlert.appendChild(ul); // Agregar la lista de errores al contenedor
    errorAlert.classList.remove("hidden");
}

// Función para ocultar la alerta de error
function ocultarAlertaError() {
    let errorAlert = document.getElementById("errorAlert");
    errorAlert.classList.add("hidden");
}

// Función para mostrar la alerta de éxito
function mostrarAlertaExito(error) {
    let successAlert = document.getElementById("successAlert");
    successAlert.innerHTML = error;
    successAlert.classList.remove("hidden");
}

// Función para ocultar la alerta de éxito
function ocultarAlertaExito() {
    let successAlert = document.getElementById("successAlert");
    successAlert.classList.add("hidden");
}


// Validación para agregar producto o pedido
document.getElementById('agregar').addEventListener('click', function() {
    ocultarAlertaError(); // Oculta la alerta de error
    ocultarAlertaExito(); // Oculta la alerta de éxito

    alertaExitoProducto = "Hemos recibido el registro de producto. Muchas gracias."
    alertaExitoPedido = "Hemos recibido su pedido. Muchas gracias."
    mensajeConfirmacionProducto = "¿Confirma el registro de este producto?"
    mensajeConfirmacionPedido = "¿Confirma el registro de este pedido?"

    if (document.getElementById('agregar-producto') === null) {
        if (validarAgregarPedido()) {
            showConfirmModal(mensajeConfirmacionPedido, alertaExitoPedido);
        } else {
            mostrarAlertaError(errores); // Muestra la alerta de error
        }
    } else {
        if (validarAgregarProducto()) {
            showConfirmModal(mensajeConfirmacionProducto, alertaExitoProducto);
        } else {
            mostrarAlertaError(errores); // Muestra la alerta de error
        }
    }
});

// Función para mostrar el modal de confirmación
function showConfirmModal(mensaje, alertaExito) {
    let modal = document.getElementById("confirmModal");
    let mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    mensajeConfirmacion.innerHTML = mensaje;
    modal.style.display = "block";
    document.getElementById("confirmYes").addEventListener("click", function() {
        hideConfirmModal();
        mostrarAlertaExito(alertaExito);
    
    });
    
    document.getElementById("confirmNo").addEventListener("click", function() {
        event.preventDefault();
        hideConfirmModal();
    });
}

// Función para ocultar el modal de confirmación
function hideConfirmModal() {
    let modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}
