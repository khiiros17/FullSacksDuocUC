// ============================================================
//  PANEL DE ADMINISTRADOR
// ============================================================


// ===== INICIO: tarjetas de resumen =====
function mostrarResumen() {
    const totalProductos = document.getElementById("total-productos");
    if (!totalProductos) return;   // si no estamos en admin/index.html, no hace nada

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Cuenta los productos con stock crítico
    const criticos = productos.filter(function (producto) {
        return tieneStockCritico(producto);
    });

    totalProductos.textContent = productos.length;
    document.getElementById("total-usuarios").textContent = usuarios.length;
    document.getElementById("total-criticos").textContent = criticos.length;
}


// ===== ¿El producto tiene stock crítico? =====
// Es crítico si tiene stock crítico definido y el stock es IGUAL o MENOR
function tieneStockCritico(producto) {
    if (producto.stockCritico === undefined || producto.stockCritico === null) {
        return false;   // no tiene stock crítico definido
    }
    return producto.stock <= producto.stockCritico;
}


// ===== PRODUCTOS: dibujar la tabla =====
function mostrarTablaProductos() {
    const tabla = document.getElementById("tabla-productos");
    if (!tabla) return;

    tabla.innerHTML = "";

    productos.forEach(function (producto) {
        let alerta = "";
        if (tieneStockCritico(producto)) {
            alerta = '<span class="alerta-stock">⚠ Crítico</span>';
        }

        tabla.innerHTML += `
      <tr>
        <td><img src="../${producto.imagen}" alt="${producto.nombre}" class="miniatura"></td>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>${producto.stock} ${alerta}</td>
        <td>
          <a href="producto-form.html?id=${producto.id}" class="boton-editar">Editar</a>
          <button class="boton-quitar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `;
    });
}


// ===== PRODUCTOS: eliminar =====
function eliminarProducto(id) {
    const confirmado = confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmado) return;

    // Busca en qué posición de la lista está el producto
    const posicion = productos.findIndex(function (producto) {
        return producto.id === id;
    });

    productos.splice(posicion, 1);   // lo saca de la lista
    guardarProductos();
    mostrarTablaProductos();
}


// ===== AL CARGAR LA PÁGINA =====
mostrarResumen();
mostrarTablaProductos();