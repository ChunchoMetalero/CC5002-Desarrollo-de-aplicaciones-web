document.getElementById('tipo-prod').addEventListener('change', function() {
    const tipo = this.value;
    const select = document.getElementById('producto-select');
    select.innerText = '';
    if (tipo === 'fruta') {
        fetch('/frutas')
            .then(response => response.json())
            .then(data => {
                data.forEach(fruta => {
                    const option = document.createElement('option');
                    option.value = fruta.id;
                    option.text = fruta.nombre;
                    select.appendChild(option);
                });
            });
    } else if (tipo === 'verdura') {
        fetch('/verduras')
            .then(response => response.json())
            .then(data => {
                data.forEach(verdura => {
                    const option = document.createElement('option');
                    option.value = verdura.id;
                    option.text = verdura.nombre;
                    select.appendChild(option);
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
        

