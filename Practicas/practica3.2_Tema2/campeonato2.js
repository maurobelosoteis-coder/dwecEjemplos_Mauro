// PRÁCTICA 3.2 - TEMA 2 JAVASCRIPT
// Campeonato DAW: varios jugadores

//Puntos correspondientes a cada resultado
const puntosPorResultado = {
    victoria: 3,
    empate: 1,
    derrota: 0
};

//Categorías del campeonato
const CATEGORIAS = [
    "PRINCIPIANTE",
    "INTERMEDIO",
    "AVANZADO",
    "EXPERTO"
];

//Función para crear un jugador
function crearJugador(nombre, curso = "2.º DAW") {
    return {
        nombre: nombre,
        curso: curso,
        partidas: [],
        bonificaciones: [],

        //Registra una partida si el resultado existe
        registrarPartida(resultado) {
            const resultadoNormalizado = String(resultado).trim().toLowerCase();

            if (!Object.hasOwn(puntosPorResultado, resultadoNormalizado)) {
                return false;
            }

            this.partidas.push(resultadoNormalizado);
            return true;
        },

        //Añade bonificaciones y devuelve la suma añadida
        aplicarBonificaciones(...bonos) {
            let suma = 0;

            for (const bono of bonos) {
                if (Number.isFinite(bono) && bono >= 0) {
                    this.bonificaciones.push(bono);
                    suma += bono;
                }
            }

            return suma;
        },

        //Cuenta las partidas de un resultado
        contar(resultado) {
            const resultadoNormalizado = String(resultado).trim().toLowerCase();

            return this.partidas.filter(
                partida => partida === resultadoNormalizado
            ).length;
        },

        //Calcula los puntos de las partidas y las bonificaciones
        puntos() {
            const puntosPartidas = this.partidas.reduce(
                (total, resultado) => total + puntosPorResultado[resultado],
                0
            );

            const puntosBonificaciones = this.bonificaciones.reduce(
                (total, bono) => total + bono,
                0
            );

            return puntosPartidas + puntosBonificaciones;
        },

        //Devuelve la categoría según los puntos
        categoria() {
            const puntuacion = this.puntos();

            if (puntuacion <= 3) {
                return "PRINCIPIANTE";
            } else if (puntuacion <= 6) {
                return "INTERMEDIO";
            } else if (puntuacion <= 9) {
                return "AVANZADO";
            } else {
                return "EXPERTO";
            }
        },

        //Devuelve el resumen del jugador
        resumen() {
            return [
                `Jugador: ${this.nombre}`,
                `Curso: ${this.curso}`,
                `Partidas jugadas: ${this.partidas.length}`,
                `Puntos obtenidos: ${this.puntos()}`,
                `Categoría: ${this.categoria()}`
            ].join("\n");
        }
    };
}

//Busca un jugador por su nombre
function buscarJugador(lista, nombre) {
    return lista.find(
        jugador =>
            jugador.nombre.toLowerCase() ===
            String(nombre).trim().toLowerCase()
    );
}

//Devuelve la clasificación sin modificar el array original
function clasificacion(lista) {
    return [...lista]
        .sort((a, b) =>
            b.puntos() - a.puntos() ||
            b.contar("victoria") - a.contar("victoria") ||
            a.nombre.localeCompare(b.nombre, "es")
        )
        .map((jugador, indice) => ({
            posicion: indice + 1,
            nombre: jugador.nombre,
            puntos: jugador.puntos(),
            categoria: jugador.categoria()
        }));
}

//Agrupa los nombres de los jugadores por categoría
function jugadoresPorCategoria(lista) {
    const grupos = {
        PRINCIPIANTE: [],
        INTERMEDIO: [],
        AVANZADO: [],
        EXPERTO: []
    };

    for (const jugador of lista) {
        grupos[jugador.categoria()].push(jugador.nombre);
    }

    return grupos;
}

//Calcula las estadísticas del campeonato
function estadisticas(lista) {
    const totalPartidas = lista.reduce(
        (total, jugador) => total + jugador.partidas.length,
        0
    );

    const victorias = lista.reduce(
        (total, jugador) => total + jugador.contar("victoria"),
        0
    );

    const empates = lista.reduce(
        (total, jugador) => total + jugador.contar("empate"),
        0
    );

    const derrotas = lista.reduce(
        (total, jugador) => total + jugador.contar("derrota"),
        0
    );

    const totalPuntos = lista.reduce(
        (total, jugador) => total + jugador.puntos(),
        0
    );

    const mediaPuntos = lista.length > 0
        ? Number((totalPuntos / lista.length).toFixed(2))
        : 0;

    return {
        totalPartidas,
        victorias,
        empates,
        derrotas,
        mediaPuntos
    };
}

//Devuelve los jugadores que han jugado y no han perdido
function invictos(lista) {
    return lista
        .filter(jugador =>
            jugador.partidas.length > 0 &&
            jugador.contar("derrota") === 0
        )
        .map(jugador => jugador.nombre);
}

//Muestra la clasificación por consola
function mostrarClasificacion(lista) {
    console.log("\n========== CLASIFICACIÓN ==========");

    const clasificados = clasificacion(lista);

    for (const jugador of clasificados) {
        console.log(
            `${jugador.posicion}. ${jugador.nombre} - ` +
            `${jugador.puntos} puntos - ${jugador.categoria}`
        );
    }

    console.log("===================================\n");
}

//Operaciones especiales
function duplicarPuntos(puntuacion) {
    return puntuacion * 2;
}

function anadirPuntos(puntuacion, cantidad = 0) {
    return puntuacion + cantidad;
}

function aplicarPenalizacion(puntuacion, cantidad = 0) {
    return Math.max(0, puntuacion - cantidad);
}

//Aplica una operación a cada jugador sin modificarlo
function aplicarOperacion(lista, operacion) {
    return lista.map(jugador => ({
        nombre: jugador.nombre,
        puntos: operacion(jugador.puntos())
    }));
}

//Crea una copia independiente de un jugador
function copiarJugador(jugador) {
    const copia = crearJugador(jugador.nombre, jugador.curso);

    copia.partidas.push(...jugador.partidas);
    copia.bonificaciones.push(...jugador.bonificaciones);

    return copia;
}

//Une varios arrays de jugadores en uno nuevo
function unirCampeonatos(...listas) {
    return listas.flat();
}

//Registra una lista de resultados en un jugador
function registrarResultados(jugador, resultados) {
    for (const resultado of resultados) {
        if (!jugador.registrarPartida(resultado)) {
            console.log(
                `Resultado no válido ("${resultado}") para ${jugador.nombre}.`
            );
        }
    }
}

// ==================== PRUEBAS ====================

//Creación de los jugadores
const ana = crearJugador("Ana");

registrarResultados(ana, [
    "victoria", "victoria", "empate", "derrota", "victoria"
]);

ana.aplicarBonificaciones(2);

const brais = crearJugador("Brais");

registrarResultados(brais, [
    "empate", "empate", "derrota", "victoria"
]);

const carla = crearJugador("Carla");

registrarResultados(carla, [
    "victoria", "victoria", "victoria", "empate"
]);

const diego = crearJugador("Diego");

registrarResultados(diego, [
    "victoria", "victoria", "empate", "empate", "empate", "empate"
]);

const eva = crearJugador("Eva");

registrarResultados(eva, [
    "derrota", "derrota", "empate"
]);

eva.aplicarBonificaciones(1, 1);

const fran = crearJugador("Fran");

registrarResultados(fran, [
    "victoria", "empate", "derrota"
]);

fran.aplicarBonificaciones(3);

//Array principal del campeonato
const jugadores = [ana, brais, carla, diego, eva, fran];

//Resumen individual de cada jugador
console.log("========== RESÚMENES ==========");

for (const jugador of jugadores) {
    console.log(`\n${jugador.resumen()}`);
}

//Clasificación
mostrarClasificacion(jugadores);

//Agrupación por categoría
console.log("========== JUGADORES POR CATEGORÍA ==========");
console.log(jugadoresPorCategoria(jugadores));

//Estadísticas generales
console.log("\n========== ESTADÍSTICAS ==========");
console.log(estadisticas(jugadores));

//Jugadores invictos
console.log("\n========== JUGADORES INVICTOS ==========");
console.log(invictos(jugadores));

//Búsqueda de un jugador
console.log("\n========== BÚSQUEDA ==========");

const jugadorBuscado = buscarJugador(jugadores, "Ana");

console.log(
    jugadorBuscado
        ? jugadorBuscado.resumen()
        : "Jugador no encontrado"
);

//Prueba de resultado no válido
console.log("\n========== PRUEBA DE RESULTADO NO VÁLIDO ==========");

console.log(
    "¿Se registra 'abandono' para Ana?",
    ana.registrarPartida("abandono")
);

console.log("Partidas de Ana:", ana.partidas.length);

//Prueba de empate a puntos y desempate
console.log("\n========== PRUEBA DE DESEMPATE ==========");

const pruebaEmpateA = crearJugador("Zoe");
pruebaEmpateA.registrarPartida("victoria");
pruebaEmpateA.registrarPartida("empate");

const pruebaEmpateB = crearJugador("Alba");
pruebaEmpateB.registrarPartida("empate");
pruebaEmpateB.registrarPartida("empate");
pruebaEmpateB.registrarPartida("empate");

const pruebaEmpateC = crearJugador("Luis");
pruebaEmpateC.registrarPartida("victoria");
pruebaEmpateC.registrarPartida("empate");

mostrarClasificacion([
    pruebaEmpateA,
    pruebaEmpateB,
    pruebaEmpateC
]);

//Prueba de operaciones especiales sin cambiar los puntos originales
console.log("========== OPERACIONES ESPECIALES ==========");

console.log(
    "Duplicar puntos:",
    aplicarOperacion(
        jugadores,
        puntuacion => duplicarPuntos(puntuacion)
    )
);

console.log(
    "Añadir 2 puntos:",
    aplicarOperacion(
        jugadores,
        puntuacion => anadirPuntos(puntuacion, 2)
    )
);

console.log(
    "Quitar 2 puntos:",
    aplicarOperacion(
        jugadores,
        puntuacion => aplicarPenalizacion(puntuacion, 2)
    )
);