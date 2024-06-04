// Llamada fetch para obtener los datos de productos desde el servidor
fetch('/stats-productos')
    .then(response => response.json())
    .then(data => {

        const categorias = data.map(item=> item.tipo);
        const valores = data.map(item=> item.cantidad);

        // Configuración del gráfico de barras
        Highcharts.chart('barchart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total de productos por tipo de fruta o verdura'
            },
            xAxis: {
                categories: categorias // Array con los tipos de frutas o verduras
            },
            yAxis: {
                title: {
                    text: 'Total de productos'
                }
            },
            series: [{
                name: 'Productos',
                data: valores, // Array con los totales de productos por categoría
                color: 'rgb(178, 243, 203)',
            }]
        });
    });




fetch('/stats-pedidos')
    .then(response => response.json())
    .then(data => {
        // Transformación de los datos para Highcharts
        const categorias = data.map(item=> item.comuna);
        const valores = data.map(item=> item.cantidad);
        

        // Configuración del gráfico circular
        Highcharts.chart('piechart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total de pedidos por comuna'
            },
            xAxis: {
                categories: categorias 
            },
            series: [{
                name: 'Pedidos',
                data: valores,
                color: 'rgb(178, 243, 203)',
            }]
        });
    });
