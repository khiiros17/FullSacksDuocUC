// ===== CARRITO DE COMPRAS =====
// El carrito se guarda en localStorage como una lista así:
// [ { id: 1, cantidad: 2 }, { id: 3, cantidad: 1 } ]


// 1. LEER el carrito de la libreta
function obtenerCarrito() {
    const guardado = localStorage.getItem("carrito");

    if (guardado) {
        return JSON.parse(guardado);   // hay algo guardado: lo convierte en lista
    } else {
        return [];                     // no hay nada: devuelve una lista vacía
    }
}


// 2. GUARDAR el carrito en la libreta
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// 3. AGREGAR un producto al carrito
function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();

    // ¿Este producto ya está en el carrito?
    const item = carrito.find(function (producto) {
        return producto.id === id;
    });

    if (item) {
        item.cantidad = item.cantidad + 1;          // ya estaba: suma 1
    } else {
        carrito.push({ id: id, cantidad: 1 });      // no estaba: lo agrega
    }

    guardarCarrito(carrito);
    actualizarContador();
}


// ACTUALIZAR el número del carrito en el header
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const carrito = obtenerCarrito();
    let total = 0;

    carrito.forEach(function (item) {
        total = total + item.cantidad;
    });

    contador.textContent = total;
}


// 5. BUSCAR un producto en la lista de productos.js usando su id
function buscarProducto(id) {
    return productos.find(function (producto) {
        return producto.id === id;
    });
}


// 6. SUMAR o RESTAR cantidad (botones + y −)
function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();

    const item = carrito.find(function (producto) {
        return producto.id === id;
    });
    if (!item) return;

    item.cantidad = item.cantidad + cambio;   // cambio es +1 o -1

    // Si la cantidad llega a 0, lo saca del carrito
    if (item.cantidad <= 0) {
        carrito = carrito.filter(function (producto) {
            return producto.id !== id;
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
    mostrarCarrito();
}


// 7. QUITAR un producto completo del carrito
function quitarDelCarrito(id) {
    let carrito = obtenerCarrito();

    carrito = carrito.filter(function (producto) {
        return producto.id !== id;
    });

    guardarCarrito(carrito);
    actualizarContador();
    mostrarCarrito();
}


// 8. VACIAR todo el carrito
function vaciarCarrito() {
    guardarCarrito([]);
    actualizarContador();
    mostrarCarrito();
}


// 9. DIBUJAR la tabla del carrito en carrito.html
function mostrarCarrito() {
    const tabla = document.getElementById("lista-carrito");
    if (!tabla) return;   // si no estamos en carrito.html, no hace nada

    const carrito = obtenerCarrito();
    const mensajeVacio = document.getElementById("carrito-vacio");
    let total = 0;

    tabla.innerHTML = "";   // borra las filas anteriores antes de dibujar de nuevo

    carrito.forEach(function (item) {
        const producto = buscarProducto(item.id);
        if (!producto) return;   // por si un producto ya no existe en la lista

        const subtotal = producto.precio * item.cantidad;
        total = total + subtotal;

        tabla.innerHTML += `
      <tr>
        <td class="celda-producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          ${producto.nombre}
        </td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>
          <button class="boton-cantidad" onclick="cambiarCantidad(${item.id}, -1)">−</button>
          ${item.cantidad}
          <button class="boton-cantidad" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </td>
        <td>$${subtotal.toLocaleString("es-CL")}</td>
        <td>
          <button class="boton-quitar" onclick="quitarDelCarrito(${item.id})">Quitar</button>
        </td>
      </tr>
    `;
    });

    // Escribe el total
    document.getElementById("total-carrito").textContent = "$" + total.toLocaleString("es-CL");

    // Muestra u oculta el mensaje "carrito vacío"
    if (carrito.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }
}


// ===== AL ABRIR CUALQUIER PÁGINA =====
actualizarContador();
mostrarCarrito();