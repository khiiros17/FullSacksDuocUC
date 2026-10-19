// listas de los productos que se van a mostrar en la pagina de productos.html
const productos = [
    {
        id: 1,
        codigo: "COM-001",
        nombre: "Spider-Man #1",
        precio: 12990,
        categoria: "Superhéroes",
        imagen: "img/spiderman.jpg",
        descripcion: "El primer número de la serie de Spider-Man, donde Peter Parker se enfrenta a su primer gran desafío como superhéroe."
    },
    {
        id: 2,
        codigo: "COM-002",
        nombre: "Batman: Año Uno",
        precio: 15990,
        categoria: "Superhéroes",
        imagen: "img/batman.jpg",
        descripcion: "Una historia que narra los primeros días de Bruce Wayne como Batman, enfrentándose a la corrupción en Gotham City y estableciendo su legado como el Caballero Oscuro."
    },
    {
        id: 3,
        codigo: "MAN-001",
        nombre: "One Piece Vol. 1",
        precio: 8990,
        categoria: "Manga",
        imagen: "img/onepiece.jpg",
        descripcion: "El primer volumen de la serie de One Piece, donde Monkey D. Luffy y su tripulación comienzan su aventura en el Grand Line."
    },
    {
        id: 4,
        codigo: "MAN-002",
        nombre: "Naruto Vol. 1",
        precio: 8490,
        categoria: "Manga",
        imagen: "img/naruto.jpg",
        descripcion: "El primer volumen de la serie de Naruto, donde Naruto Uzumaki comienza su viaje como shinobi."
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
    <a href="detalle-producto.html?id=${producto.id}">
      <img src="${producto.imagen}" alt="${producto.nombre}">
    </a>
    <h3>
      <a href="detalle-producto.html?id=${producto.id}">${producto.nombre}</a>
    </h3>
    <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
    <button class="boton-anadir" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
  </article>
    `;
    });
}

// ===== DIBUJAR EL DETALLE DE UN PRODUCTO =====
function mostrarDetalle() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;   // si no estamos en detalle-producto.html, no hace nada

    // 1. Lee el "papelito" de la URL (?id=3) y saca el número
    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    // 2. Busca ese producto en la lista
    const producto = productos.find(function (p) {
        return p.id === id;
    });

    // 3. Si no existe, muestra un mensaje
    if (!producto) {
        contenedor.innerHTML = `
      <p>Producto no encontrado. <a href="productos.html">Volver a productos</a></p>
    `;
        return;
    }

    // 4. Cambia el título de la pestaña del navegador
    document.title = "ComMangaVerse - " + producto.nombre;

    // 5. Dibuja la ruta: Inicio > Categoría > Producto
    document.getElementById("ruta-producto").innerHTML = `
    <a href="index.html">Inicio</a> &gt;
    <a href="productos.html">${producto.categoria}</a> &gt;
    <span>${producto.nombre}</span>
  `;

    // 6. Dibuja el detalle
    contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">

    <div class="info-producto">
      <span class="etiqueta-categoria">${producto.categoria}</span>
      <h2>${producto.nombre}</h2>
      <p class="codigo">Código: ${producto.codigo}</p>
      <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
      <p>${producto.descripcion}</p>
      <button class="boton-anadir" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
    </div>
  `;
}

//  ejecuta la función apenas carga la página
mostrarProductos();
mostrarDetalle();