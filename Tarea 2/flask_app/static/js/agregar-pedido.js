document.getElementById('tipo-prod').addEventListener('change', function() {
    const tipo = this.value;
    const select = document.getElementById('producto-select');
    select.innerText = '';
    if (tipo === 'fruta') {
        fetch('../data/frutas.json')
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
        fetch('../data/verduras.json')
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

fetch('../data/regiones.json')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('region-select');
        data.forEach(region => {
            const option = document.createElement('option');
            option.value = region.region;
            option.text = region.region;
            select.appendChild(option);
        });
    });

document.getElementById('region-select').addEventListener('change', function() {
    const region = this.value;
    fetch(`../data/regiones.json`)
        .then(response => response.json())
        .then(data => {
            const comunas = data.find(region => region.region === this.value).comunas;
            const select = document.getElementById('comuna-select');
            select.innerText = '';
            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.text = comuna;
                select.appendChild(option);
            });
        });
});
        

