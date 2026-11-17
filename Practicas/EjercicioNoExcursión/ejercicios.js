//Ejercicio 1
//a)
function tablaMultiplicar(n) {
    let tabla = [];

    for (let i = 1; i <= 10; i++) {
        tabla.push(n + " x " + i + " = " + (n * i));
    }

    return tabla;
}

console.log("EJERCICIO 1.a");
console.log(tablaMultiplicar(7));


//b)
function mcd(a, b) {

    while (b !== 0) {
        let resto = a % b;
        a = b;
        b = resto;
    }

    return a;
}

console.log("EJERCICIO 1.b");
console.log(mcd(48, 18));
console.log(mcd(17, 5));



//Ejercicio 2
//a)
function dividir(a, b) {

    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Los dos valores deben ser números");
    }

    if (b === 0) {
        throw new Error("No se puede dividir entre 0");
    }

    return a / b;
}


//b)
function dividirSeguro(a, b) {

    try {
        return dividir(a, b);

    } catch (error) {
        return error.name + ": " + error.message;
    }
}

console.log("EJERCICIO 2");
console.log(dividirSeguro(10, 4));
console.log(dividirSeguro(10, 0));
console.log(dividirSeguro("10", 2));



//Ejercicio 3
const productos = [
    { nombre: "manzana", precio: 2, categoria: "fruta" },
    { nombre: "leche", precio: 1.5, categoria: "lácteo" },
    { nombre: "queso", precio: 6, categoria: "lácteo" },
    { nombre: "pera", precio: 2.5, categoria: "fruta" },
    { nombre: "pan", precio: 1, categoria: "panadería" }
];


//a)
function nombresHasta(lista, precioMaximo) {

    return lista
        .filter(producto => producto.precio <= precioMaximo)
        .map(producto => producto.nombre);
}

console.log("EJERCICIO 3.a");
console.log(nombresHasta(productos, 2));


//b)
function ordenarPorPrecio(lista) {

    return [...lista].sort((a, b) => a.precio - b.precio);
}

console.log("EJERCICIO 3.b");
console.log(ordenarPorPrecio(productos).map(producto => producto.nombre));


//c)
function buscarProducto(lista, nombre) {

    return lista.find(producto => producto.nombre === nombre);
}

console.log("EJERCICIO 3.c");
console.log(buscarProducto(productos, "kiwi"));

console.log("Comprobación del array original:");
console.log(productos[0].nombre);



//Ejercicio 4
//a)
function contarRepeticiones(palabras) {

    let cuenta = {};

    for (let palabra of palabras) {

        if (cuenta[palabra]) {
            cuenta[palabra]++;
        } else {
            cuenta[palabra] = 1;
        }
    }

    return cuenta;
}

console.log("EJERCICIO 4.a");
console.log(contarRepeticiones([
    "pan", "leche", "pan", "huevos", "pan", "leche"
]));


//b)
function describirObjeto(objeto) {

    let resultado = [];

    for (let clave in objeto) {
        resultado.push(clave + ": " + objeto[clave]);
    }

    return resultado;
}

console.log("EJERCICIO 4.b");
console.log(describirObjeto({
    nombre: "Uxía",
    curso: "2.º DAW",
    edad: 20
}));



//Ejercicio 5
//a)
function sumarPrecios(lista) {

    return lista.reduce((acumulador, producto) => {
        return acumulador + producto.precio;
    }, 0);
}

console.log("EJERCICIO 5.a");
console.log(sumarPrecios(productos));


//b)
function maximo(numeros) {

    return numeros.reduce((mayor, numero) => {

        if (numero > mayor) {
            return numero;
        } else {
            return mayor;
        }

    });
}

console.log("EJERCICIO 5.b");
console.log(maximo([4, 17, 9, 23, 11]));


//c)
function agruparPorCategoria(lista) {

    return lista.reduce((acumulador, producto) => {

        if (!acumulador[producto.categoria]) {
            acumulador[producto.categoria] = [];
        }

        acumulador[producto.categoria].push(producto.nombre);

        return acumulador;

    }, {});
}

console.log("EJERCICIO 5.c");
console.log(agruparPorCategoria(productos));
