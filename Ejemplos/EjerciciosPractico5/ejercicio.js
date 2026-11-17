function calcularDescuento(precio, esClienteVip) {

    if(typeof precio !== "number" || precio <= 0) {
        return null;
    }

    if(typeof esClienteVip !== "boolean") {
        return null;
    }

    let vueltas = 0;

    while(precio > 100 && vueltas < 5) {
        precio = precio * 0.95;

        if(esClienteVip) {
            precio = precio * 0.95;
        }
        vueltas++;
    }

    return precio;

}

function main() {
    console.log(calcularDescuento(200, false));
    console.log(calcularDescuento(200, true));
    console.log(calcularDescuento(80, false));
    console.log(calcularDescuento(-50, false));
    console.log(calcularDescuento(200, "true"));
}

main();