//Mauro Beloso León
const TARIFAS = { normal: 8, vip: 14, imax: 12 };
const DESCUENTO_JOVEN = 2;
const DESCUENTO_GRUPO = 10;
const CAPACIDAD = 30;
const sesiones = { tarde: [5, 6], noche: [12] };
const programacion = [
{ id: "P1", pelicula: "Dune", sala: "imax", inicio: 1080, duracion: 150 },
{ id: "P2", pelicula: "Coco", sala: "imax", inicio: 1240, duracion: 100 },
{ id: "P3", pelicula: "Alien", sala: "imax", inicio: 1245, duracion: 110 },
{ id: "P4", pelicula: "Coco", sala: "vip", inicio: 1100, duracion: 100 }
];
const ventas = [
{ id: "V1", pelicula: "Dune", sala: "imax", entradas: 3 },
{ id: "V2", pelicula: "Coco", sala: "normal", entradas: 4 },
{ id: "V3", pelicula: "Dune", sala: "imax", entradas: 2, cancelada: true },
{ id: "V4", pelicula: "Coco", sala: "vip", entradas: 1 },
{ id: "V5", pelicula: "Alien", sala: "normal", entradas: 5 }
];

//1
const precioEntradas = (sala, entradas, carnetJoven = false) => {

    if (typeof entradas !== "number" || entradas < 1 || entradas > 8) {
        throw new Error("Número de entradas no válido: " + entradas);
    }

    if (TARIFAS[sala] === undefined) {
        throw new Error("Sala desconocida: " + sala);
    }

    let precio = TARIFAS[sala] * entradas;

    if (carnetJoven) {
        precio = precio - (DESCUENTO_JOVEN * entradas);
    }

    if (entradas >= 6) {
        precio = precio - DESCUENTO_GRUPO;
    }

    return precio;
};
console.log(precioEntradas("normal", 2, true));   // 12
console.log(precioEntradas("vip", 6));  // 74
try {
precioEntradas("4d", 1);
} catch (error) {
console.log(error.message);                     
}
try {
precioEntradas("normal", 0);
} catch (error) {
console.log(error.message);                     
}
try {
precioEntradas("vip", "2");
} catch (error) {
console.log(error.message);                     
}


//2
const venderButacas = (sesiones, sesion, ...butacas) => {

    if (butacas.length === 0) {
        throw new Error("Indica al menos una butaca");
    }

    const ocupadas = sesiones[sesion] || [];

    const nuevas = [];

    for (const butaca of butacas) {

        if (butaca < 1 || butaca > CAPACIDAD) {
            throw new Error("La butaca no existe: " + butaca);
        }

        if (nuevas.includes(butaca)) {
            throw new Error("Butaca repetida: " + butaca);
        }

        if (ocupadas.includes(butaca)) {
            throw new Error("Ocupada: butaca " + butaca + " en " + sesion);
        }

        nuevas.push(butaca);
    }

    if (sesiones[sesion] === undefined) {
        sesiones[sesion] = [];
    }

    sesiones[sesion].push(...butacas);

    return CAPACIDAD - sesiones[sesion].length;
};

console.log(venderButacas(sesiones, "tarde", 7, 8));        
try {
venderButacas(sesiones, "noche", 13, 12);
} catch (error) {
console.log(error.message);                     
// 26
// Ocupada: butaca 12 en noche
}
console.log(sesiones.noche);                      
// [12]  (la 13 no se ha vendido)
console.log(venderButacas(sesiones, "matinal", 1));         
// 29
try {
venderButacas(sesiones, "matinal", 7, 7);
} catch (error) {
console.log(error.message);                     
}
try {
venderButacas(sesiones, "tarde", 30, 31);
} catch (error) {
console.log(error.message);                     
}


//3
const sesionesDePelicula = (programacion, pelicula) => {

    return programacion
        .filter(sesion => sesion.pelicula === pelicula)
        .map(sesion => {
            const fin = sesion.inicio + sesion.duracion;

            return `${sesion.id} (${sesion.sala}, ${sesion.inicio}-${fin})`;
        });

};

console.log(sesionesDePelicula(programacion, "Coco"));     
// ["P2 (imax, 1240-1340)", "P4 (vip, 1100-1200)"]
console.log(sesionesDePelicula(programacion, "Titanic"));  // []


//4
const resumenVentas = (ventas, tarifas) => {

    // Eliminamos las ventas canceladas
    const ventasValidas = ventas.filter(venta => venta.cancelada !== true);


    // Calculamos la recaudación por sala
    const recaudacion = ventasValidas.reduce((acumulado, venta) => {

        if (acumulado[venta.sala] === undefined) {
            acumulado[venta.sala] = 0;
        }

        acumulado[venta.sala] += tarifas[venta.sala] * venta.entradas;

        return acumulado;

    }, {});


    // Calculamos la película con más entradas
    const resultado = ventasValidas.reduce((acumulado, venta) => {

        if (acumulado.conteo[venta.pelicula] === undefined) {
            acumulado.conteo[venta.pelicula] = 0;
        }

        acumulado.conteo[venta.pelicula] += venta.entradas;

        if (acumulado.conteo[venta.pelicula] > acumulado.maxEntradas) {

            acumulado.maxEntradas = acumulado.conteo[venta.pelicula];

            acumulado.peliculaTop = venta.pelicula;
        }

        return acumulado;

    }, {
        conteo: {},
        maxEntradas: 0,
        peliculaTop: null
    });


    return {
        recaudacion: recaudacion,
        peliculaTop: resultado.peliculaTop
    };

};

console.log(resumenVentas(ventas, TARIFAS));
// { recaudacion: { imax: 36, normal: 72, vip: 14 }, peliculaTop: "Coco" }
console.log(resumenVentas([], TARIFAS));
// { recaudacion: {}, peliculaTop: null }