const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const temperaturas = [24, 28, 26, 31, 22, 29, 25];
const inventario = { cafe: 8, te: 15, zumo: 3 };
const PRECIO_BASE = 7;
const EDAD_INFANTIL = 10;
const RECARGO_FIN_DE_SEMANA = 1;
const DIA_DEL_ESPECTADOR = "jueves";
const DESCUENTO_ESPECTADOR = 1.5;
const carrito = [
{ producto: "café", precio: 3.75, cantidad: 2 },
{ producto: "galletas", precio: 1.5, cantidad: 4 },
{ producto: "zumo", precio: 2.5, cantidad: 1 },
{ producto: "té", precio: 2.25, cantidad: 3 }
]

//EJERCICIO 1 ARRAYS
function diasDesde(temperaturas, umbral) {
    const resultado = [];
    for(let i = 0; i < temperaturas.length; i++) {
        if(temperaturas[i] >= umbral) {
            resultado.push(DIAS[i]);
        }
    }
    return resultado;
}

//EJERCICIO 2 OBJETOS
function retirarProducto(inventario, producto, unidades) {
    if (!(producto in inventario)) {
        throw new Error("Producto desconocido: " + producto);
    }
    if (unidades > inventario[producto]) {
        throw new Error("Stock insuficiente: quedan " + inventario[producto]);
    }
    
    inventario[producto] -= unidades;
    
    if (inventario[producto] === 0) {
        delete inventario[producto];
    }
    return inventario[producto] !== undefined ? inventario[producto] : 0;
}

//EJERCICIO 3 FUNCIONES
function calcularTarifa(edad, dia) {
    if (edad < 0 || edad > 120) {
        throw new Error("Edad no válida: " + edad);
    }

    let precio = PRECIO_BASE;

    if (edad < EDAD_INFANTIL || edad >= 65) {
        precio = precio / 2;
    }

    switch (dia) {
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
        if (item.cantidad >= 2) {
            return total + (item.precio * item.cantidad);
        }
        return total;
    }, 0);
}


console.log(diasDesde(temperaturas, 28));

console.log(retirarProducto(inventario, "te", 5));
console.log(retirarProducto(inventario, "zumo", 3));

try {
    retirarProducto(inventario, "agua", 1);
} catch (error) {
    console.log(error.message);
}

console.log("inventario actual:", inventario);

console.log(calcularTarifa(40, "sábado"));
console.log(calcularTarifa(10, "jueves"));
console.log(calcularTarifa(65, "viernes"));

try {
    calcularTarifa(-5, "lunes");
} catch (error) {
    console.log(error.message);
}

console.log(calcularTotal(carrito))