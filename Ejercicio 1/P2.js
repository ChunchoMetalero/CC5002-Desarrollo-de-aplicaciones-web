const restaButton = document.getElementById('btn-resta');
const sumaButton = document.getElementById('btn-suma');

restaButton.addEventListener("click", resta);
sumaButton.addEventListener("click", suma);

let n = 0;

function aumento() {
    contador.innerText = n;
}

function suma() {
    n++;
    console.log(n);
    aumento();
}

function resta() {
    n--;
    console.log(n);
    aumento();
}

