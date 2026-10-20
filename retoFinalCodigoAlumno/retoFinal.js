function codigoAlumno(apellido) {
    const letras = apellido.substring(0, 3).toUpperCase();
    const año = new Date().getFullYear();
    const numero = Math.floor(Math.random() * 900) + 100;

    return letras + año + numero;
}

console.log(codigoAlumno("García"));