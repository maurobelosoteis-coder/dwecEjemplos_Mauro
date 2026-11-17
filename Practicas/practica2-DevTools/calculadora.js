//Buscamos los elementos de la página por su id, los sacamos del index.html
var formulario = document.getElementById("formulario");
var resultado = document.getElementById("resultado");

//Añadimos un evento al botón de calcular
formulario.addEventListener("submit", function (evento) {

  //Evita que la página se recargue
  evento.preventDefault();

  //Leemos las notas y las convertimos a número
  var examen = Number(document.getElementById("examen").value);
  var practica = Number(document.getElementById("practica").value);

  //Calculamos la nota final con la fórmula dada
  var notaFinal = examen * 0.7 + practica * 0.3;

  //Mostramos el resultado con dos decimales
  var texto = "Nota final: " + notaFinal.toFixed(2);

  //Si la nota es mayor a cinco, mostramos aprobado, si es menos, mostramos suspenso
  if (notaFinal >= 5) {
    resultado.textContent = texto + " - Aprobado";
    resultado.className = "aprobado";
  } else {
    resultado.textContent = texto + " - Suspenso";
    resultado.className = "suspenso";
  }
});