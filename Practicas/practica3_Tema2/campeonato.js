//Estas líneas permiten que el programa haga preguntas y lea las respuestas de la terminal
const readline = require("node:readline/promises");
const { stdin: entrada, stdout: salida } = require("node:process");

const rl = readline.createInterface({
    input: entrada,
    output: salida
});

//Variables del jugador
let nombreJugador = "";
let puntos = 0;
let partidasJugadas = 0;

//Función para registrar una partida
function registrarPartida(resultado) {
    switch (resultado.toLowerCase()) {
        case "victoria":
            puntos += 3;
            partidasJugadas++;
            return true;

        case "empate":
            puntos += 1;
            partidasJugadas++;
            return true;

        case "derrota":
            puntos += 0;
            partidasJugadas++;
            return true;

        default:
            console.log("Resultado no válido. No se contabiliza.");
            return false;
    }
}

//Función arrow para obtener la categoría
const obtenerCategoria = (puntos) => {
    if (puntos <= 3) {
        return "PRINCIPIANTE";
    } else if (puntos <= 6) {
        return "INTERMEDIO";
    } else if (puntos <= 9) {
        return "AVANZADO";
    } else {
        return "EXPERTO";
    }
};

//Función con parámetro por defecto
function mostrarPuntos(puntuacion = 0) {
    console.log(`Puntuación actual: ${puntuacion} puntos`);
}

//Función con rest para sumar bonificaciones variables
function sumarBonificaciones(...bonificaciones) {
    let total = 0;

    for (const bonificacion of bonificaciones) {
        total += bonificacion;
    }

    return total;
}

//Función para duplicar los puntos
function duplicarPuntos() {
    puntos *= 2;
}

//Función para añadir puntos extra
function anadirPuntos(cantidad = 0) {
    puntos += cantidad;
}

//Función para aplicar una penalización
function aplicarPenalizacion(cantidad = 0) {
    puntos = Math.max(0, puntos - cantidad);
}

//Función para mostrar el resumen final
function mostrarResumen(nombre, partidas, puntuacion) {
    console.log("\n========== RESUMEN FINAL ==========");
    console.log(`Jugador: ${nombre}`);
    console.log(`Partidas jugadas: ${partidas}`);
    console.log(`Puntos obtenidos: ${puntuacion}`);
    console.log(`Categoría: ${obtenerCategoria(puntuacion)}`);
    console.log("===================================");
}

//Programa principal
async function main() {
    try {
        nombreJugador = (await rl.question("Nombre del jugador: ")).trim();

        if (nombreJugador === "") {
            nombreJugador = "Jugador desconocido";
        }

        console.log("\n--- REGISTRO DE PARTIDAS ---");
        console.log("Escribe victoria, empate o derrota.");
        console.log("Escribe fin cuando hayas terminado.");

        let resultado;

        do {
            resultado = (await rl.question("Resultado de la partida: "))
                .trim()
                .toLowerCase();

            if (resultado !== "fin") {
                registrarPartida(resultado);
            }
        } while (resultado !== "fin");

        mostrarPuntos(puntos);

        //Bonificaciones variables
        console.log("\n--- BONIFICACIONES ---");
        const respuestaBonificaciones = await rl.question(
            "Introduce las bonificaciones separadas por comas (ejemplo: 2,1,3). Si no hay, pulsa Enter: "
        );

        if (respuestaBonificaciones.trim() !== "") {
            const bonificaciones = respuestaBonificaciones
                .split(",")
                .map(valor => Number(valor.trim()));

            const validas = bonificaciones.every(
                valor => Number.isFinite(valor) && valor >= 0
            );

            if (validas) {
                //Spread: pasa cada elemento como argumento
                puntos += sumarBonificaciones(...bonificaciones);
            } else {
                console.log("Bonificaciones no válidas. No se aplican.");
            }
        }

        //Operaciones especiales
        console.log("\n--- OPERACIONES ESPECIALES ---");
        console.log("1. Duplicar puntos");
        console.log("2. Añadir puntos extra");
        console.log("3. Aplicar penalización");
        console.log("4. No realizar ninguna operación");

        const opcion = (await rl.question("Elige una opción: ")).trim();

        switch (opcion) {
            case "1":
                duplicarPuntos();
                break;

            case "2": {
                const cantidad = Number(
                    await rl.question("¿Cuántos puntos quieres añadir? ")
                );

                if (Number.isFinite(cantidad) && cantidad >= 0) {
                    anadirPuntos(cantidad);
                } else {
                    console.log("Cantidad no válida. No se añaden puntos.");
                }
                break;
            }

            case "3": {
                const cantidad = Number(
                    await rl.question("¿Cuántos puntos quieres quitar? ")
                );

                if (Number.isFinite(cantidad) && cantidad >= 0) {
                    aplicarPenalizacion(cantidad);
                } else {
                    console.log("Cantidad no válida. No se aplica la penalización.");
                }
                break;
            }

            case "4":
                console.log("No se realizan operaciones especiales.");
                break;

            default:
                console.log("Opción no válida. Se mantienen los puntos.");
        }

        //Resumen final
        mostrarResumen(nombreJugador, partidasJugadas, puntos);

    } finally {
        rl.close();
    }
}

main();
