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
    if (fotos.length === 0) {
        errores.push('Debe seleccionar al menos una foto');
        return false;
    }
    if (fotos.length > 3) {
        errores.push('Solo puede seleccionar hasta 3 fotos');
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
    const tipo = document.getElementById('tipo-prod').value;
    const productos = Array.from(document.getElementById('producto-select').selectedOptions).map(option => option.value);
    const fotos = document.getElementById('imagen').files;
    const region = document.getElementById('region-select').value;
    const comuna = document.getElementById('comuna-select').value;
    const nombre = document.getElementById('nombre-prod').value;
    const correo = document.getElementById('email-prod').value;
    const telefono = document.getElementById('telefono-prod').value;
    return validarTipoProducto(tipo) && validarProductos(productos) && validarFotos(fotos) && validarRegion(region) && validarComuna(comuna) && validarNombreProductor(nombre) && validarCorreoProductor(correo) && validarTelefonoProductor(telefono);
}

validarAgregarPedido = () => {
    const tipo = document.getElementById('tipo-prod').value;
    const productos = Array.from(document.getElementById('producto-select').selectedOptions).map(option => option.value);
    const region = document.getElementById('region-select').value;
    const comuna = document.getElementById('comuna-select').value;
    const nombre = document.getElementById('nombre-comp').value;
    const correo = document.getElementById('email-comp').value;
    const telefono = document.getElementById('telefono-comp').value;
    return validarTipoProducto(tipo) && validarProductos(productos) && validarRegion(region) && validarComuna(comuna) && validarNombreProductor(nombre) && validarCorreoProductor(correo) && validarTelefonoProductor(telefono);
}


// Función para mostrar la alerta de error
function mostrarAlertaError(error) {
    var errorAlert = document.getElementById("errorAlert");
    errorAlert.innerHTML = error;
    errorAlert.classList.remove("hidden");
}

// Función para ocultar la alerta de error
function ocultarAlertaError() {
    var errorAlert = document.getElementById("errorAlert");
    errorAlert.classList.add("hidden");
}

// Función para mostrar la alerta de éxito
function mostrarAlertaExito(error) {
    var successAlert = document.getElementById("successAlert");
    successAlert.innerHTML = error;
    successAlert.classList.remove("hidden");
}

// Función para ocultar la alerta de éxito
function ocultarAlertaExito() {
    var successAlert = document.getElementById("successAlert");
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
            for (let i = 0; i < errores.length; i++) {
                mostrarAlertaError(errores[i]); // Muestra la alerta de error
            }
        }
    } else {
        if (validarAgregarProducto()) {
            showConfirmModal(mensajeConfirmacionProducto, alertaExitoProducto);
        } else {
            for (let i = 0; i < errores.length; i++) {
                mostrarAlertaError(errores[i]); // Muestra la alerta de error
            }
        }
    }
});

// Función para mostrar el modal de confirmación
function showConfirmModal(mensaje, alertaExito) {
    var modal = document.getElementById("confirmModal");
    var mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    mensajeConfirmacion.innerHTML = mensaje;
    modal.style.display = "block";
    document.getElementById("confirmYes").addEventListener("click", function() {
        hideConfirmModal();
        mostrarAlertaExito(alertaExito);
    
    });
    
    document.getElementById("confirmNo").addEventListener("click", function() {
        hideConfirmModal();
    });
}

// Función para ocultar el modal de confirmación
function hideConfirmModal() {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}
