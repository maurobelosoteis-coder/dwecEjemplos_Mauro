const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const temperaturas = [18, 22, 24, 19, 27, 30, 21];
const inventario = { teclado: 5, raton: 12, monitor: 2 };
const PRECIO_BASE = 8;
const EDAD_INFANTIL = 12;
const RECARGO_FIN_DE_SEMANA = 1.5;
const DIA_DEL_ESPECTADOR = "miércoles";
const DESCUENTO_ESPECTADOR = 2;
const carrito = [
{ producto: "pan", precio: 1.5, cantidad: 3 },
{ producto: "leche", precio: 2, cantidad: 6 },
{ producto: "queso", precio: 4.5, cantidad: 1 },
{ producto: "fruta", precio: 0.75, cantidad: 4 }
];

//EJERCICIO 1 ARRAYS
function diasPorEncimaDe(temperaturas, umbral){
    const resultado = [];
    for(let i = 0; i < temperaturas.length; i++){
        if(temperaturas[i] > umbral){
            resultado.push(DIAS[i]);
        }
    }
    return resultado;
}

//EJERCICIO 2 OBJETOS
function registrarVenta(inventario, producto, unidades){
    if(!(producto in inventario)) {
        throw new Error("Producto desconocido: " + producto);
    }
    if(unidades > inventario[producto]){
        throw new Error("Stock insuficiente: quedan " + inventario[producto])
    }
    inventario[producto] -= unidades;
    return inventario[producto];
}

//EJERCICIO 3 FUNCIONES
function calcularTarifa(edad, dia){
    if(edad < 0 || edad > 120){
        throw new Error("Edad no válida: " + edad);
    }

    let precio = PRECIO_BASE;

    if(edad < EDAD_INFANTIL || edad >= 65) {
        precio = precio / 2;
    }

    switch(dia){
        case "sábado":
        case "domingo":
            precio += RECARGO_FIN_DE_SEMANA;
            break;
        case DIA_DEL_ESPECTADOR:
            precio -= DESCUENTO_ESPECTADOR;
            break;
        default:
            break;
    }
    return precio;
}

//EJERCICIO 4 REDUCE
function calcularTotal(carrito) {
    return carrito.reduce((total, item) => {
        if (item.precio >= 2) {
            return total + (item.precio * item.cantidad);
        }
        return total;
    }, 0);
}

//PRUEBAS
console.log(diasPorEncimaDe(temperaturas, 24));

console.log(registrarVenta(inventario, "raton", 4));

try {
    registrarVenta(inventario, "monitor", 3);
} catch (error) {
    console.log(error.message);
}

try {
    registrarVenta(inventario, "webcam", 1);
} catch (error) {
    console.log(error.message);
}

console.log("inventario actual:", inventario);

console.log(calcularTarifa(30, "sábado"));
console.log(calcularTarifa(12, "miércoles"));
console.log(calcularTarifa(65, "lunes"));

try {
    calcularTarifa(-5, "lunes");
} catch (error) {
    console.log(error.message);
}

console.log(calcularTotal(carrito));