
// ==========================================
// DATOS INICIALES DE LOS ALUMNOS
// ==========================================

const alumnosIniciales = [
    { nombre: 'Pedro Rodríguez', curso: 'DAW Superior', id: 101 },
    { nombre: 'Laura Jiménez', curso: 'DAM Superior', id: 102 },
    { nombre: 'María Álvarez', curso: 'ASIR Superior', id: 103 }
];


// ==========================================
// PRÁCTICA 1: INICIALIZAR ALUMNOS
// ==========================================

function inicializarAlumnos(alumnos) {

    // Seleccionamos el cuerpo de la tabla
    const tabla = document.querySelector('tbody');

    // Eliminamos las filas que existan
    tabla.innerHTML = '';

    // Recorremos el array de alumnos
    for (const alumno of alumnos) {

        // Creamos una fila
        const fila = document.createElement('tr');

        // Añadimos la clase y el atributo data
        fila.classList.add('alumno');
        fila.dataset.alumnoId = alumno.id;

        // Creamos las celdas
        const celdaNombre = document.createElement('td');
        const celdaCurso = document.createElement('td');

        // Introducimos los datos
        celdaNombre.textContent = alumno.nombre;
        celdaCurso.textContent = alumno.curso;

        // Añadimos las celdas a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCurso);

        // Añadimos la fila a la tabla
        tabla.appendChild(fila);
    }
}


// ==========================================
// PRÁCTICA 2: AÑADIR ALUMNO
// ==========================================

function anadirAlumno(nombre, curso) {

    const tabla = document.querySelector('tbody');

    // Buscamos el ID máximo existente
    let maxId = 0;

    const filas = tabla.querySelectorAll('.alumno');

    for (const fila of filas) {

        const id = Number(fila.dataset.alumnoId);

        if (id > maxId) {
            maxId = id;
        }
    }

    // El siguiente ID será el máximo + 1
    const nuevoId = maxId + 1;

    // Creamos el objeto del nuevo alumno
    const nuevoAlumno = {
        nombre: nombre,
        curso: curso,
        id: nuevoId
    };

    // Creamos la fila
    const fila = document.createElement('tr');

    fila.classList.add('alumno');
    fila.dataset.alumnoId = nuevoId;

    // Creamos las celdas
    const celdaNombre = document.createElement('td');
    const celdaCurso = document.createElement('td');

    celdaNombre.textContent = nombre;
    celdaCurso.textContent = curso;

    // Añadimos las celdas
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCurso);

    // Añadimos la fila al final de la tabla
    tabla.appendChild(fila);

    // Devolvemos el objeto
    return nuevoAlumno;
}


// ==========================================
// PRÁCTICA 3: ELIMINAR ALUMNO POR ID
// ==========================================

function eliminarAlumnoPorId(id) {

    const tabla = document.querySelector('tbody');

    // Buscamos todas las filas de alumnos
    const filas = tabla.querySelectorAll('.alumno');

    for (const fila of filas) {

        // Comprobamos si el ID coincide
        if (Number(fila.dataset.alumnoId) === id) {

            // Eliminamos la fila
            fila.remove();

            return true;
        }
    }

    // Si no encontramos el alumno
    return false;
}


// ==========================================
// PRÁCTICA 4 Y 5: ELIMINAR ALUMNO POR NOMBRE
// ==========================================

function eliminarAlumnoPorNombre(nombre, expresion = false) {

    const tabla = document.querySelector('tbody');

    // Buscamos todas las filas
    const filas = tabla.querySelectorAll('.alumno');

    // Variable para saber si se ha eliminado alguno
    let eliminado = false;

    for (const fila of filas) {

        // Obtenemos el nombre de la primera celda
        const nombreAlumno = fila.querySelector('td').textContent;

        // Comprobamos el nombre
        if (expresion === true) {

            // Coincidencia parcial
            if (nombreAlumno.includes(nombre)) {
                fila.remove();
                eliminado = true;
            }

        } else {

            // Coincidencia exacta
            if (nombreAlumno === nombre) {
                fila.remove();
                eliminado = true;
            }
        }
    }

    return eliminado;
}


// ==========================================
// PRUEBAS DE LAS CINCO PRÁCTICAS
// ==========================================


// PRÁCTICA 1
inicializarAlumnos(alumnosIniciales);


// PRÁCTICA 2
console.log("PRÁCTICA 2:");

console.log(anadirAlumno('Juan Fdez', 'SBD'));


// PRÁCTICA 3
console.log("PRÁCTICA 3:");

console.log(eliminarAlumnoPorId(102));


// PRÁCTICA 4
console.log("PRÁCTICA 4:");

anadirAlumno('Juan Fdez', 'SBD');
anadirAlumno('Juan Fdez', 'SBD');

console.log(eliminarAlumnoPorNombre('Juan Fdez'));


// PRÁCTICA 5
console.log("PRÁCTICA 5:");

anadirAlumno('Juan Fdez', 'SBD');
anadirAlumno('Juan Fdez', 'SBD');

console.log(eliminarAlumnoPorNombre('Juan', true));
