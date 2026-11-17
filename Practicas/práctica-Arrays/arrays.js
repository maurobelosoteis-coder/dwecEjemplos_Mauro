//1 parte
const notas = [5,7,8,9,4];

const suma = notas.reduce((total, nota) => total + nota, 0);
const media = suma / notas.length;

console.log("Media: " + media);

//2 parte
const aprobadas = notas.filter(nota => nota >= 5);

console.log("Notas aprobadas: " + aprobadas);

//3 parte
const notasIncrementadas = notas.map(nota => nota + 1);

console.log("Notas incrementadas: " + notasIncrementadas);

//4 parte
const nota9 = notas.find(nota => nota >= 9);
console.log("Primera nota igual o superior a 9: " + nota9);

//5 parte
const alumnos = [
    { nombre: "Ana", nota: 6 },
    { nombre: "Brais", nota: 4 },
    { nombre: "Carla", nota: 8 },
    { nombre: "Diego", nota: 3 },
    { nombre: "Eva", nota: 9 }
];

const nombresAprobados = alumnos.filter(alumno => alumno.nota >= 5).map(alumno => alumno.nombre);

console.log("Alumnos aprobados: " + nombresAprobados);