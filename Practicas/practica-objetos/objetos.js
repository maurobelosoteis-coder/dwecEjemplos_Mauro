//1 parte
const producto = {
    nombre: "Ratón",
    precio: 25,
    stock: 10,

    //2 parte
    hayStock() {
        return this.stock > 0;
    }

};

console.log(producto);
console.log(producto.hayStock());

//3 parte
const productos = [
    {
        nombre: "Ratón",
        precio: 25,
        stock: 10,

        hayStock() {
            return this.stock > 0;
        }
    },
    {
        nombre: "Teclado",
        precio: 50,
        stock: 0,

        hayStock() {
            return this.stock > 0;
        }
    },
    {
        nombre: "Monitor",
        precio: 150,
        stock: 5,

        hayStock() {
            return this.stock > 0;
        }
    }
];

//4 parte
const productosConStock = productos.filter(producto => producto.hayStock());

console.log("Productos con stock:", productosConStock);

//5 parte
const nombres = productos.map(producto => producto.nombre);

console.log("Nombres: ", nombres);

//6 parte
const productoCopia = {
    ...producto,
    precio: 30
};

console.log("Producto original: ", producto);
console.log("Copia modificada: ", productoCopia);