const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const temperaturas = [15, 19, 21, 16, 23, 17, 14];
const inventario = { cuaderno: 20, boligrafo: 35 };
const PRECIO_BASE = 9;
const EDAD_INFANTIL = 14;
const RECARGO_FIN_DE_SEMANA = 2;
const DIA_DEL_ESPECTADOR = "martes";
const DESCUENTO_ESPECTADOR = 3;
const carrito = [
{ producto: "arroz", precio: 1.25, cantidad: 2 },
{ producto: "aceite", precio: 5, cantidad: 1 },
{ producto: "huevos", precio: 2.25, cantidad: 2 },
{ producto: "café", precio: 6.5, cantidad: 1 }
];

//EJERCICIO 1 ARRAYS
function diasPorDebajoDe(temperaturas, umbral){
    const resultado = [];
    for (let i = 0; i < temperaturas.length; i++) {
        if(temperaturas[i] < umbral){
            resultado.push(DIAS[i]);
        }
    }
    return resultado;
}

//EJERCICIO 2 OBJETOS
function registrarCompra(inventario, producto, unidades) {
    if(unidades <= 0){
        throw new Error("Cantidad no valida: " + unidades);
    }
    if(!(producto in inventario)) {
        inventario[producto] = 0;
    }
    inventario[producto] += unidades;
    return inventario[producto];
}

//EJERCICIO 3 FUNCIONES
function calcularTarifa(edad, dia) {
    if(edad < 0 || edad > 120) {
        throw new Error("Edad no válida: " + edad);
    }

    let precio = PRECIO_BASE;

    if(edad < EDAD_INFANTIL || edad >= 65) {
        precio = precio / 2;
    }

    switch (dia) {
        case "sábado":
        case "domingo":
            precio += RECARGO_FIN_DE_SEMANA;
            break;
        case DIA_DEL_ESPECTADOR:
            precio -= DESCUENTO_ESPECTADOR;
        default:
            break;
    }
    return precio;
}

//EJERCICIO 4 REDUCE
function calcularTotal(carrito) {
    return carrito.reduce((total, item) => {
        if(item.precio < 5) {
            return total + (item.precio * item.cantidad);
        }
        return total;
    }, 0);
}

console.log(diasPorDebajoDe(temperaturas, 17));

console.log(registrarCompra(inventario, "boligrafo", 10))
console.log(registrarCompra(inventario, "estuche", 6))
try {
    registrarCompra(inventario, "cuaderno", 0);
} catch (error) {
    console.log(error.message); // Esto imprimirá "Cantidad no válida: 0" limpiamente en la consola
}
console.log("inventario actual:", inventario);

console.log(calcularTarifa(25, "domingo"))
console.log(calcularTarifa(14, "martes"))
console.log(calcularTarifa(65, "jueves"))
try{
    calcularTarifa(-5, "lunes")
}catch (error) {
    console.log(error.message);
}

console.log(calcularTotal(carrito))