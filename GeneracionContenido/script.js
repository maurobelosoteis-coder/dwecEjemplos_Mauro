// Datos iniciales
const alumnosIniciales = [
    { nombre: 'Pedro Rodríguez', curso: 'DAW Superior', id: 101 },
    { nombre: 'Laura Jiménez', curso: 'DAM Superior', id: 102 },
    { nombre: 'María Álvarez', curso: 'ASIR Superior', id: 103 }
];


// Ej 1: Inicializar alumnos
function inicializarAlumnos(alumnos) {
    const tbody = document.querySelector("#tabla-alumnos tbody");
    tbody.innerHTML = "";

    for (const alumno of alumnos) {
        const tr = document.createElement("tr");
        tr.classList.add("alumno");
        tr.dataset.alumnoId = alumno.id;

        const tdNombre = document.createElement("td");
        tdNombre.textContent = alumno.nombre;

        const tdCurso = document.createElement("td");
        tdCurso.textContent = alumno.curso;

        tr.appendChild(tdNombre);
        tr.appendChild(tdCurso);
        tbody.appendChild(tr);
    }
}


// Ej 2: Añadir alumno
function anadirAlumno(nombre, curso) {
    const tbody = document.querySelector("#tabla-alumnos tbody");
    const filas = tbody.querySelectorAll("tr.alumno");

    let maxId = 0;
    for (const fila of filas) {
        const idActual = Number(fila.dataset.alumnoId);
        if (idActual > maxId) {
            maxId = idActual;
        }
    }
    const nuevoId = maxId + 1;

    const tr = document.createElement("tr");
    tr.classList.add("alumno");
    tr.dataset.alumnoId = nuevoId;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;

    const tdCurso = document.createElement("td");
    tdCurso.textContent = curso;

    tr.appendChild(tdNombre);
    tr.appendChild(tdCurso);
    tbody.appendChild(tr);

    return { nombre: nombre, curso: curso, id: nuevoId };
}


// Ej 3: Eliminar alumno por Id (usando find)
function eliminarAlumnoPorld(Id) {
    const filas = Array.from(document.querySelectorAll("tr.alumno"));
    
    // Usamos .find() para buscar la fila que coincida con el ID
    const filaEncontrada = filas.find(fila => Number(fila.dataset.alumnoId) === Id);

    if (filaEncontrada) {
        filaEncontrada.remove();
        return true;
    }
    return false;
}


// Ej 4: Eliminar alumno por Nombre exacto
function eliminarAlumnoPorNombre(nombre) {
    const filas = document.querySelectorAll("tr.alumno");
    let eliminado = false;

    for (const fila of filas) {
        if (fila.children[0].textContent === nombre) {
            fila.remove();
            eliminado = true;
        }
    }
    return eliminado;
}


// Ej 5: Eliminar por Nombre (con includes y parámetro opcional)
function eliminarAlumnoPorNombreV2(nombre, expresion = false) {
    const filas = document.querySelectorAll("tr.alumno");
    let eliminado = false;

    for (const fila of filas) {
        const nombreFila = fila.children[0].textContent;

        // Si expresion es true, usamos .includes() para buscar la subcadena.
        // Si es false, comprobamos igualdad estricta.
        if (expresion ? nombreFila.includes(nombre) : nombreFila === nombre) {
            fila.remove();
            eliminado = true;
        }
    }
    return eliminado;
}


// PRUEBAS
console.log("--- Inicializando tabla ---");
inicializarAlumnos(alumnosIniciales);

console.log("--- Añadiendo alumnos (Práctica 2) ---");
console.log(anadirAlumno('Juan Fdez', 'SBD'));
console.log(anadirAlumno('Juan Fdez', 'SBD')); // Añadido dos veces para la Práctica 4/5

console.log("--- Eliminar por ID (Práctica 3) ---");
console.log(eliminarAlumnoPorld(102)); // true
console.log(eliminarAlumnoPorld(333)); // false (no existe)

console.log("--- Eliminar por Nombre exacto (Práctica 4) ---");
//Eliminará a los dos "Juan Fdez" que añadimos antes
console.log(eliminarAlumnoPorNombre('Juan Fdez')); // true

console.log("--- Eliminar por Nombre con expresión (Práctica 5) ---");
//Volvemos a añadir alumnos para probar la expresión
anadirAlumno('Juan Fdez', 'SBD');
anadirAlumno('Juan Pérez', 'SBD');
anadirAlumno('Ana López', 'DAW');

// Al pasar 'true', usará .includes('Juan') y borrará tanto a 'Juan Fdez' como a 'Juan Pérez'
console.log(eliminarAlumnoPorNombreV2('Juan', true)); // true

// Prueba con 'false' (por defecto), solo borraría si el nombre es exactamente 'Ana'
console.log(eliminarAlumnoPorNombreV2('Ana')); // false (porque se llama 'Ana López')