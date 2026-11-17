const pedidos = [
 { cliente: "Ana", importe: 15, metodoPago: "VISA" },
 { cliente: "Brais", importe: 42, metodoPago: "PAYPAL" },
 { cliente: "Carla", importe: 75, metodoPago: "VISA" },
 { cliente: "Diego", importe: 0, metodoPago: "EFECTIVO" },
 { cliente: "Eva", importe: 120, metodoPago: "PAYPAL" }
];

let totalPedidosValidos = 0;
let importeTotal = 0;


//PARTE 1
for (const pedido of pedidos) {
    //Parte 3
    if (pedido.importe <= 0) {
        console.log(`Pedido de ${pedido.cliente} ignorado: importe non válido`);
        continue; // Salta esta iteración e pasa ao seguinte pedido
    }

    //Parte 1
    let categoria = "";

    if(pedido.importe < 20){
        categoria = "Pedido pequeno";
    } else if(pedido.importe <= 50){
        categoria = "Pedido mediano";
    }else {
        categoria = "Pedido grande";
    }

    console.log(pedido.cliente);
    console.log(`${pedido.importe} EUR - ${categoria}`);

    //Parte 2
    switch(pedido.metodoPago){
        case "VISA":
            console.log("Pago con tarxeta");
            break;
        case "PAYPAL":
            console.log("Pago con PayPal");
            break;
        case "EFECTIVO":
            console.log("Pago en efectivo");
            break;
        default:
            console.log("Metodo de pago desconocido");
            break;
    }

    totalPedidosValidos++;
    importeTotal += pedido.importe;

    console.log(`Pedidos válidos: ${totalPedidosValidos}`);
    console.log(`Importe total: ${importeTotal} EUR`);

    let clienteMayor100 = "";
    for(const p of pedidos){
        if(p.importe > 100){
            clienteMayor100 = p.cliente;
            break;
        }
    }
    console.log(`Primeiro pedido superior a 100 EUR: ${clienteMayor100}`);

}

let opcion = "";
do{
    opcion = prompt(
        "Escolle una opción:\n" +
        "1. Ver número de pedidos válidos\n" +
        "2. Ver importe total\n" +
        "3. Sair"
    );

    if(opcion === null){
        opcion = "3";
    }

    switch (opcion) {
        case "1":
            alert(`Pedidos válidos: ${totalPedidosValidos}`);
            console.log(`Opción 1 - Pedidos válidos: ${totalPedidosValidos}`);
            break;
        case "2":
            alert(`Importe total: ${importeTotal} EUR`);
            console.log(`Opción 2 - Importe total: ${importeTotal} EUR`);
            break;
        case "3":
            console.log("Saíndo do menú...");
            break;
        default:
            alert("Opción non válida. Inténtao de novo.");
            console.log("Opción non válida seleccionada no menú.");
            break;
    }

}while(opcion !== "3");