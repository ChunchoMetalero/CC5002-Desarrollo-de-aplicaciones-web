document.getElementById('tipo-prod').addEventListener('change', function() {
    const tipo = this.value;
    const container = document.getElementById('producto-checkboxes');
    container.innerHTML = ''; // Limpiar el contenedor

    if (tipo === 'fruta') {
        fetch('/frutas')
            .then(response => response.json())
            .then(data => {
                data.forEach(fruta => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'Producto';
                    checkbox.value = fruta.id;
                    checkbox.id = `fruta-${fruta.id}`;

                    const label = document.createElement('label');
                    label.htmlFor = `fruta-${fruta.id}`;
                    label.textContent = fruta.nombre;

                    const div = document.createElement('div');
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    container.appendChild(div);
                });
            });
    } else if (tipo === 'verdura') {
        fetch('/verduras')
            .then(response => response.json())
            .then(data => {
                data.forEach(verdura => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'Producto';
                    checkbox.value = verdura.id;
                    checkbox.id = `verdura-${verdura.id}`;

                    const label = document.createElement('label');
                    label.htmlFor = `verdura-${verdura.id}`;
                    label.textContent = verdura.nombre;

                    const div = document.createElement('div');
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    container.appendChild(div);
                });
            });
    }
});


fetch('/regiones')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('region-select');
        data.forEach(region => {
            const option = document.createElement('option');
            option.value = region.id;
            option.text = region.nombre;
            select.appendChild(option);
        });
    });

    document.getElementById('region-select').addEventListener('change', function() {
        const region = this.value;
        fetch(`/comunas?region_id=${region}`)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById('comuna-select');
                select.innerText = ''; 
    
                data.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna.id;
                    option.text = comuna.nombre;
                    select.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al obtener las comunas:', error);
            });
    });


