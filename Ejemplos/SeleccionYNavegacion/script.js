function actualizarPanelCursos(){
    
const listaCursos = document.getElementById("lista-cursos");

for(const curso of listaCursos.children) {
    const plazas = curso.dataset.plazas;

    if(plazas === "0"){
        curso.textContent += " --COMPLETO";
    } else {
        curso.setAttribute("estado-curso", '${plazas} plazas libres');
    }
}

}

actualizarPanelCursos();


function contarHermanosCompletos(curso) {
    let contador = 0;
    let hermano = curso.nextElementSibling;

    while (hermano !== null) {
        if (hermano.dataset.plazas === "0") {
            contador++;
        }

        hermano = hermano.nextElementSibling;
    }

    hermano = curso.previousElementSibling;

    while (hermano !== null) {
        if (hermano.dataset.plazas === "0") {
            contador++;
        }

        hermano = hermano.previousElementSibling;
    }

    return contador;
}


const cursoActual = document.querySelectorAll("#lista-cursos li")[1];

console.log(contarHermanosCompletos(cursoActual));


function resaltarFilaPorNombre(nombre) {
  const tablaAlumnos = document.querySelector("#tabla-alumnos");
  const celda = tablaAlumnos
    ? Array.from(tablaAlumnos.querySelectorAll("td")).find((elemento) =>
        elemento.textContent.includes(nombre)
      )
    : null;


  if (!celda) {
    console.log(`No se encontró ningún alumno llamado ${nombre}`);
    return;
  }


  celda.style.fontWeight = "bold";
  celda.parentElement.setAttribute("title", "Alumno encontrado");
}


resaltarFilaPorNombre('Juan Fernández');
resaltarFilaPorNombre('No existe');