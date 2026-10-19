// listas de los productos que se van a mostrar en la pagina de productos.html
const productos = [
    {
        id: 1,
        codigo: "COM-001",
        nombre: "Spider-Man #1",
        precio: 12990,
        categoria: "Superhéroes",
        imagen: "img/spiderman.jpg"
    },
    {
        id: 2,
        codigo: "COM-002",
        nombre: "Batman: Año Uno",
        precio: 15990,
        categoria: "Superhéroes",
        imagen: "img/batman.jpg"
    },
    {
        id: 3,
        codigo: "MAN-001",
        nombre: "One Piece Vol. 1",
        precio: 8990,
        categoria: "Manga",
        imagen: "img/onepiece.jpg"
    },
    {
        id: 4,
        codigo: "MAN-002",
        nombre: "Naruto Vol. 1",
        precio: 8490,
        categoria: "Manga",
        imagen: "img/naruto.jpg"
    }
];

//  dibujar las tarjetas funcion para mostrar los productos
function mostrarProductos() {

    //  Busca en el HTML la caja vacía donde van las tarjetas
    const contenedor = document.getElementById("lista-productos");

    // si esta página no tiene esa caja no hace nada
    if (!contenedor) return;

    // Por cada producto de la lista
    productos.forEach(function (producto) {

        // 3 agrega una tarjeta dentro de la caja
        contenedor.innerHTML += `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
        <button class="boton-anadir">Añadir al carrito</button>
      </article>
    `;
    });
}

//  ejecuta la función apenas carga la página
mostrarProductos();