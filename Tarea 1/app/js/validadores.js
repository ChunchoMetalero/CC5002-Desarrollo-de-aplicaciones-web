//Validadores

validarTipoProducto = (tipo) => {
    if (tipo === 'none') {
        alert('Debe seleccionar un tipo de producto');
        return false;
    }
    return true;
}

validarProductos = (productos) => {
    if (productos.length === 0) {
        alert('Debe seleccionar al menos un producto');
        return false;
    }
    if (productos.length > 5) {
        alert('Solo puede seleccionar hasta 5 productos');
        return false;
    }
    return true;
}

validarFotos = (fotos) => {
    if (fotos.length === 0) {
        alert('Debe seleccionar al menos una foto');
        return false;
    }
    if (fotos.length > 3) {
        alert('Solo puede seleccionar hasta 3 fotos');
        return false;
    }
    return true;
}

validarRegion = (region) => {
    if (region === 'none') {
        alert('Debe seleccionar una region');
        return false;
    }
    return true;
}

validarComuna = (comuna) => {
    if (comuna === 'none') {
        alert('Debe seleccionar una comuna');
        return false;
    }
    return true;
}

validarNombreProductor = (nombre) => {
    // largo minimo 3 y maximo 80
    if (nombre.length < 3 || nombre.length > 80) {
        alert('Debe ingresar un nombre valido');
        return false;
    }
    return true;
} 

validarCorreoProductor = (correo) => {
    // Cumpir formato correo electronico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(correo)) {
        alert('El correo electronico no es valido');
        return false;
    }
    return true;
}

validarTelefonoProductor = (telefono) => {
    // largo minimo 9 y maximo 15
    if (telefono.length < 9 || telefono.length > 15) {
        alert('El telefono del productor debe tener entre 9 y 15 caracteres');
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


// Validacion agregar producto y agregar pedido
document.getElementById('agregar').addEventListener('click', function() {
    if (document.getElementById('agregar-producto')===null) {
        if (validarAgregarPedido()) {
            alert('Pedido agregado correctamente');
        }
        return;
    }
    if (validarAgregarProducto()) {
        alert('Producto agregado correctamente');
    }
});






  
