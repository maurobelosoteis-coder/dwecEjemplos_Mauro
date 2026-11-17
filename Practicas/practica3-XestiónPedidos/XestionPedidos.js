const pedidos = [
    { cliente: "Ana", importe: 15, metodoPago: "VISA" },
    { cliente: "Brais", importe: 42, metodoPago: "PAYPAL" },
    { cliente: "Carla", importe: 75, metodoPago: "VISA" },
    { cliente: "Diego", importe: 0, metodoPago: "EFECTIVO" },
    { cliente: "Eva", importe: 120, metodoPago: "PAYPAL" }
];

let totalPedidosValidos = 0;
let importeTotal = 0;

for (const pedido of pedidos) {

    //Parte 3
    if (pedido.importe <= 0) {
        console.log(`Pedido de ${pedido.cliente} ignorado: importe no válido`);
        continue;
    }

    //Parte 1
    let categoria;

    if (pedido.importe < 20) {
        categoria = "Pedido pequeño";
    } else if (pedido.importe <= 50) {
        categoria = "Pedido medio";
    } else {
        categoria = "Pedido grande";
    }

    //Parte 2
    let mensajePago;

    switch (pedido.metodoPago) {
        case "VISA":
            mensajePago = "Pago con tarjeta";
            break;

        case "PAYPAL":
            mensajePago = "Pago con PayPal";
            break;

        case "EFECTIVO":
            mensajePago = "Pago en efectivo";
            break;

        default:
            mensajePago = "Método de pago desconocido";
            break;
    }

    console.log(
        `${pedido.cliente} - ${pedido.importe} EUR - ${categoria} - ${mensajePago}`
    );

    //Parte 4
    totalPedidosValidos++;
    importeTotal += pedido.importe;
}

console.log(`Pedidos validos: ${totalPedidosValidos}`);
console.log(`Importe total: ${importeTotal} EUR`);

//Parte 5
for (const pedido of pedidos) {

    if (pedido.importe > 100) {
        console.log(`Primero pedido superior a 100 EUR: ${pedido.cliente}`);
        break;
    }

}

//Parte 6
let opcion;

do {
    opcion = prompt(
        "MENÚ\n" +
        "1. Ver número de pedidos válidos\n" +
        "2. Ver importe total\n" +
        "3. Salir\n\n" +
        "Selecciona una opción:"
    );

    switch (opcion) {
        case "1":
            console.log(`Pedidos válidos: ${totalPedidosValidos}`);
            break;

        case "2":
            console.log(`Importe total: ${importeTotal} EUR`);
            break;

        case "3":
            console.log("Saliendo do menú...");
            break;

        default:
            console.log("Opción no válida");
            break;
    }

} while (opcion !== "3");