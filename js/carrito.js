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


// 4. ACTUALIZAR el número del 🛒 en el header
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


// Al abrir cualquier página, muestra el número correcto
actualizarContador();