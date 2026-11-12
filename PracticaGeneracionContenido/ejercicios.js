
// ==========================================
// DATOS INICIALES DE ALUMNOS
// ==========================================

const alumnosIniciales = [
    { nombre: 'Pedro Rodríguez', curso: 'DAW Superior', id: 101 },
    { nombre: 'Laura Jiménez', curso: 'DAM Superior', id: 102 },
    { nombre: 'María Álvarez', curso: 'ASIR Superior', id: 103 }
];


// ==========================================
// PRÁCTICA 1: IMPRIMIR LA TABLA CON ALUMNOS
// ==========================================

function inicializarAlumnos(alumnos) {

    const tabla = document.querySelector('#tabla-alumnos tbody');

    // Eliminamos las filas que ya existen
    tabla.innerHTML = '';

    // Recorremos el array de alumnos
    for (const alumno of alumnos) {

        const fila = document.createElement('tr');
        fila.className = 'alumno';

        // Añadimos el id como atributo data
        fila.dataset.alumnoId = alumno.id;

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = alumno.nombre;

        const celdaCurso = document.createElement('td');
        celdaCurso.textContent = alumno.curso;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCurso);

        tabla.appendChild(fila);
    }
}


// ==========================================
// PRÁCTICA 2: AÑADIR ALUMNO
// ==========================================

function anadirAlumno(nombre, curso) {

    const tabla = document.querySelector('#tabla-alumnos tbody');

    // Obtenemos todas las filas existentes
    const filas = tabla.querySelectorAll('.alumno');

    // Calculamos el id máximo
    let maxId = 0;

    for (const fila of filas) {

        const id = Number(fila.dataset.alumnoId);

        if (id > maxId) {
            maxId = id;
        }
    }

    // El nuevo id será el máximo + 1
    const nuevoId = maxId + 1;

    // Creamos el objeto del nuevo alumno
    const nuevoAlumno = {
        nombre: nombre,
        curso: curso,
        id: nuevoId
    };

    // Creamos la nueva fila
    const fila = document.createElement('tr');
    fila.className = 'alumno';
    fila.dataset.alumnoId = nuevoId;

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = nombre;

    const celdaCurso = document.createElement('td');
    celdaCurso.textContent = curso;

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

    const tabla = document.querySelector('#tabla-alumnos tbody');

    const filas = tabla.querySelectorAll('.alumno');

    for (const fila of filas) {

        const idAlumno = Number(fila.dataset.alumnoId);

        if (idAlumno === id) {

            fila.remove();

            return true;
        }
    }

    return false;
}


// ==========================================
// PRÁCTICA 4 Y 5: ELIMINAR ALUMNO POR NOMBRE
// ==========================================

function eliminarAlumnoPorNombre(nombre, expresion = false) {

    const tabla = document.querySelector('#tabla-alumnos tbody');

    const filas = tabla.querySelectorAll('.alumno');

    let eliminado = false;

    for (const fila of filas) {

        const nombreAlumno = fila.querySelector('td').textContent;

        if (expresion === true) {

            // Si contiene el texto indicado
            if (nombreAlumno.includes(nombre)) {

                fila.remove();
                eliminado = true;
            }

        } else {

            // Si coincide exactamente el nombre
            if (nombreAlumno === nombre) {

                fila.remove();
                eliminado = true;
            }
        }
    }

    return eliminado;
}


// ==========================================
// PRUEBAS DE LAS 5 PRÁCTICAS
// ==========================================

// PRÁCTICA 1
inicializarAlumnos(alumnosIniciales);


// PRÁCTICA 2
//console.log(anadirAlumno('Juan Fdez', 'SBD'));


// PRÁCTICA 3
//console.log(eliminarAlumnoPorId(102));
//console.log(eliminarAlumnoPorId(333));


// PRÁCTICA 4
//anadirAlumno('Juan Fdez', 'SBD');
//anadirAlumno('Juan Fdez', 'SBD');
//console.log(eliminarAlumnoPorNombre('Juan Fdez'));


// PRÁCTICA 5
//anadirAlumno('Juan Fdez', 'SBD');
//anadirAlumno('Juan Fdez', 'SBD');
//console.log(eliminarAlumnoPorNombre('Juan', true));
