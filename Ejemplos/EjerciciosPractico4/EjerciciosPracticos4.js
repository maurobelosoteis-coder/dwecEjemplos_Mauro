function esPrimo(numero, mostrarDivisores = false) {

    if(typeof numero !== "number") {
        console.log("Error: numero debe ser de tipo number");
        return null;
    }

    if(typeof mostrarDivisores !== "boolean") {
        console.log("Error: mostrarDivisores debe ser de tipo boolean");
        return null;
    }

    let esPrimo = true;

    if(numero<2){
        esPrimo = false;
    }

    for(let i=2; i<numero; i++){
        if(numero % i === 0){
            esPrimo = false;

            if(mostrarDivisores) {
                console.log("Divisor: ", i);
            }
        }
    }

    return esPrimo;

}

function main() {
    console.log(esPrimo(7));
    console.log(esPrimo(10, true));
    console.log(esPrimo(13, true));
}

main();