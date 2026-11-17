// Datos iniciales
const alumnosIniciales = [
    { nombre: 'Pedro Rodríguez', curso: 'DAW Superior', id: 101 },
    { nombre: 'Laura Jiménez', curso: 'DAM Superior', id: 102 },
    { nombre: 'María Álvarez', curso: 'ASIR Superior', id: 103 }
];


// Ej 1: Inicializar alumnos
function inicializarAlumnos(alumnos) {

    //Seleccionamos el tbody de la tabla de alumnos
    const tbody = document.querySelector("#tabla-alumnos tbody");

    //Vaciamos el contenido de la tabla para evitar duplicados
    tbody.innerHTML = "";

    //Recorremos todos los alumnos del array
    for (const alumno of alumnos) {

        //Creamos una nueva fila de la tabla
        const tr = document.createElement("tr");

        //Añadimos la clase alumno a la fila
        tr.classList.add("alumno");

        //Guardamos el ID del alumno como atributo data
        tr.dataset.alumnoId = alumno.id;

        //Creamos una celda para mostrar el nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = alumno.nombre;

        //Creamos otra celda para mostrar el curso
        const tdCurso = document.createElement("td");
        tdCurso.textContent = alumno.curso;

        //Añadimos las dos celdas a la fila
        tr.appendChild(tdNombre);
        tr.appendChild(tdCurso);

        //Añadimos la fila completa al tbody de la tabla
        tbody.appendChild(tr);
    }
}


// Ej 2: Añadir alumno
function anadirAlumno(nombre, curso) {

    //Seleccionamos el cuerpo de la tabla.
    const tbody = document.querySelector("#tabla-alumnos tbody");

    //Seleccionamos todas las filas que tengan la clase alumno.
    const filas = tbody.querySelectorAll("tr.alumno");

    //Variable para guardar el ID más alto encontrado.
    let maxId = 0;

    //Recorremos todas las filas existentes.
    for (const fila of filas) {

        //Recuperamos el ID guardado en el atributo data.
        //Number() convierte el valor de texto en un número.
        const idActual = Number(fila.dataset.alumnoId);

        //Si encontramos un ID mayor, actualizamos maxId.
        if (idActual > maxId) {
            maxId = idActual;
        }
    }

    //El nuevo ID será el siguiente al ID más alto.
    const nuevoId = maxId + 1;

    //Creamos una nueva fila.
    const tr = document.createElement("tr");

    //Le añadimos la clase alumno.
    tr.classList.add("alumno");

    //Guardamos el nuevo ID en la fila.
    tr.dataset.alumnoId = nuevoId;

    //Creamos la celda del nombre.
    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;

    //Creamos la celda del curso.
    const tdCurso = document.createElement("td");
    tdCurso.textContent = curso;

    //Añadimos las celdas a la fila.
    tr.appendChild(tdNombre);
    tr.appendChild(tdCurso);

    //Introducimos la nueva fila en la tabla.
    tbody.appendChild(tr);

    //Devolvemos un objeto con los datos del alumno creado.
    return { nombre: nombre, curso: curso, id: nuevoId };
}


//Ej 3: Eliminar alumno por ID
function eliminarAlumnoPorld(Id) {

    //Seleccionamos todas las filas de alumnos.
    //Array.from() convierte el NodeList en un array
    //para poder utilizar métodos como find().
    const filas = Array.from(document.querySelectorAll("tr.alumno"));

    //find() busca la primera fila cuyo ID coincida
    //con el ID que hemos recibido como parámetro.
    const filaEncontrada = filas.find(
        fila => Number(fila.dataset.alumnoId) === Id
    );

    //Comprobamos si hemos encontrado alguna fila.
    if (filaEncontrada) {

        //Eliminamos la fila del documento HTML.
        filaEncontrada.remove();

        //Devolvemos true porque se ha eliminado correctamente.
        return true;
    }

    //Si no existe ningún alumno con ese ID, devolvemos false.
    return false;
}


//Ej 4: Eliminar alumno por nombre exacto
function eliminarAlumnoPorNombre(nombre) {

    //Seleccionamos todas las filas de alumnos.
    const filas = document.querySelectorAll("tr.alumno");

    //Variable que indica si se ha eliminado algún alumno.
    let eliminado = false;

    //Recorremos todas las filas.
    for (const fila of filas) {

        //children[0] selecciona la primera celda (nombre).
        //textContent obtiene el texto que contiene esa celda.
        if (fila.children[0].textContent === nombre) {

            //Eliminamos la fila si el nombre coincide exactamente.
            fila.remove();

            //Indicamos que se ha producido una eliminación.
            eliminado = true;
        }
    }

    //Devolvemos true si se ha eliminado algún alumno,
    //o false si no se ha encontrado ninguno.
    return eliminado;
}


//Ej 5: Eliminar por nombre
function eliminarAlumnoPorNombreV2(nombre, expresion = false) {

    //Seleccionamos todas las filas de alumnos.
    const filas = document.querySelectorAll("tr.alumno");

    //Variable para saber si se ha eliminado algún alumno.
    let eliminado = false;

    //Recorremos todas las filas de la tabla.
    for (const fila of filas) {

        //Obtenemos el nombre de la primera celda.
        const nombreFila = fila.children[0].textContent;

        //Utilizamos un operador ternario:
        //Si expresion es true, buscamos si el nombre contiene
        //el texto recibido mediante includes().
        //Si es false, exigimos que los nombres sean exactamente iguales.
        if (expresion ? nombreFila.includes(nombre) : nombreFila === nombre) {

            //Eliminamos la fila que cumple la condición.
            fila.remove();

            //Indicamos que se ha eliminado un alumno.
            eliminado = true;
        }
    }

    //Devolvemos el resultado de la búsqueda.
    return eliminado;
}



console.log("--- Inicializando tabla ---");
inicializarAlumnos(alumnosIniciales);


console.log("--- Añadiendo alumnos (Práctica 2) ---");
console.log(anadirAlumno('Juan Fdez', 'SBD'));
console.log(anadirAlumno('Juan Fdez', 'SBD'));


console.log("--- Eliminar por ID (Práctica 3) ---");
console.log(eliminarAlumnoPorld(102));
console.log(eliminarAlumnoPorld(333));


console.log("--- Eliminar por Nombre exacto (Práctica 4) ---");
console.log(eliminarAlumnoPorNombre('Juan Fdez'));


console.log("--- Eliminar por Nombre con expresión (Práctica 5) ---");

anadirAlumno('Juan Fdez', 'SBD');
anadirAlumno('Juan Pérez', 'SBD');
anadirAlumno('Ana López', 'DAW');

console.log(eliminarAlumnoPorNombreV2('Juan', true));

console.log(eliminarAlumnoPorNombreV2('Ana'));