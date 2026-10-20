//1. Sin parámetros
const saludar = () => {
    return "!Hola, DAM¡";
}

//2. Un parámetro
const doble = n => {
    return n * 2;
}

//3. Dos parámetros
const sumar = (a,b) => {
    return a + b;
}

//4. Devuelve un booleano
const esMayorDeEdad = edad => {
    return edad >= 18;
}

//5. Texto y Template literal
const presentar = (nombre, curso) => {
    return 'Soy ${nombre} y estudio ${curso}';
}

//6. Parámetro por defecto
const potencia = (base, exponente = 2) => {
    return base ** exponente;
}

//7. Varias líneas: necesita llaves y return
const notaFinal = (teoria, practica) => {
    const media = teoria * 0.4 + practica * 0.6;
    return Math.round(media * 10) / 10;
}

//8. Con if
const calificar = nota => {
    if (nota >= 5) {
        return "Aprobado";
    }
    return "Suspenso";
}

//9. Devuelve un objeto
const crearAlumno = (nombre, nota) => {
    return { nombre: nombre, nota: nota };
}

//10. Parámetro rest
const contar = (...elementos) => {
    return elementos.length;
}

//11. Recibe una función (callback)
const aplicarATodos = (lista, fn) => {
    const resultado = [];
    for (const x of lista) {
        resultado.push(fn(x));
    }
    return resultado;
}

//12.Callbacks con map y filter
const notas = [4,8,6,9,3];

const aprobadas = notas.filter(n => {
    return n >= 5;
});

const subidas = notas.map(n => {
    return n + 1;
})

//13. Función que devuelve otra función (closure)
const multiplicarPor = factor => {
    return n => {
        return n * factor;
    };
};

const triple = multiplicarPor(3);


//14. Contador con estado privado (closure)
const crearContador = inicio => {
    let valor = inicio;

    return {
        sumar: () => {
            valor++;
            return valor;
        },

        reiniciar: () => {
            valor = inicio;
            return valor;
        }
    };
};

const contador = crearContador(10);


//15. filter → sort → map sobre un array de objetos
const alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 4 },
    { nombre: "Eva", nota: 9 },
    { nombre: "Iago", nota: 6 }
];

const ranking = lista => {
    return lista
        .filter(a => a.nota >= 5)
        .sort((a, b) => b.nota - a.nota)
        .map(a => `${a.nombre} (${a.nota})`);
};


//16. Aplicar varias funciones seguidas (rest + reduce)
const aplicar = (valor, ...funciones) => {
    return funciones.reduce((acc, f) => {
        return f(acc);
    }, valor);
};

const sumarDos = n => n + 2;


//17. Agrupar por una propiedad (reduce + clave calculada)
const agruparPor = (lista, clave) => {
    return lista.reduce((grupos, el) => {
        const k = el[clave];

        if (!grupos[k]) {
            grupos[k] = [];
        }

        grupos[k].push(el.nombre);
        return grupos;
    }, {});
};

const modulos = [
    { nombre: "Ana", curso: "DAW" },
    { nombre: "Luis", curso: "DAM" },
    { nombre: "Eva", curso: "DAW" }
];