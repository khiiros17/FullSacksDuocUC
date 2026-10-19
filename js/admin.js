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

// ============================================================
//  VALIDACIONES DEL PRODUCTO
// ============================================================

// Código: obligatorio, mínimo 3, y que no esté repetido
function validarCodigo(valor, idActual) {
    if (valor === "") {
        return "El código es obligatorio.";
    }
    if (valor.length < 3) {
        return "El código debe tener al menos 3 caracteres.";
    }

    // ¿Otro producto ya usa este código?
    const repetido = productos.find(function (producto) {
        return producto.codigo.toUpperCase() === valor.toUpperCase() && producto.id !== idActual;
    });
    if (repetido) {
        return "Ya existe un producto con ese código.";
    }

    return "";
}


// Descripción: opcional, máximo 500
function validarDescripcion(valor) {
    if (valor.length > 500) {
        return "La descripción no puede tener más de 500 caracteres.";
    }
    return "";
}


// Precio: obligatorio, número, mínimo 0, acepta decimales
function validarPrecio(valor) {
    if (valor === "") {
        return "El precio es obligatorio.";
    }
    const numero = Number(valor);
    if (isNaN(numero)) {
        return "El precio debe ser un número.";
    }
    if (numero < 0) {
        return "El precio no puede ser negativo (0 = producto gratis).";
    }
    return "";
}


// Número entero, mínimo 0 (sirve para stock y stock crítico)
function validarEntero(valor, nombreCampo, obligatorio) {
    if (valor === "") {
        if (obligatorio) {
            return "El " + nombreCampo + " es obligatorio.";
        }
        return "";   // es opcional y está vacío
    }
    const numero = Number(valor);
    if (!Number.isInteger(numero)) {
        return "El " + nombreCampo + " debe ser un número entero (sin decimales).";
    }
    if (numero < 0) {
        return "El " + nombreCampo + " no puede ser negativo.";
    }
    return "";
}

// ============================================================
//  FORMULARIO DE PRODUCTO (crear y editar)
// ============================================================
function iniciarFormularioProducto() {
    const formulario = document.getElementById("form-producto");
    if (!formulario) return;

    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const precio = document.getElementById("precio");
    const stock = document.getElementById("stock");
    const stockCritico = document.getElementById("stock-critico");
    const categoria = document.getElementById("categoria");
    const imagen = document.getElementById("imagen");
    const avisoStock = document.getElementById("aviso-stock");

    // ----- ¿Estamos EDITANDO? Lee el id de la URL -----
    const parametros = new URLSearchParams(window.location.search);
    const idEditar = Number(parametros.get("id"));

    const productoEditar = productos.find(function (producto) {
        return producto.id === idEditar;
    });

    // Si existe, llena el formulario con sus datos
    if (productoEditar) {
        document.getElementById("titulo-formulario").textContent = "Editar producto";
        document.getElementById("boton-guardar").textContent = "Guardar cambios";

        codigo.value = productoEditar.codigo;
        nombre.value = productoEditar.nombre;
        descripcion.value = productoEditar.descripcion || "";
        precio.value = productoEditar.precio;
        stock.value = productoEditar.stock;
        stockCritico.value = productoEditar.stockCritico ?? "";
        categoria.value = productoEditar.categoria;
        imagen.value = productoEditar.imagen;
    }

    // ----- Funciones de revisión -----
    function revisarCodigo() { return mostrarError(codigo, validarCodigo(codigo.value.trim(), idEditar)); }
    function revisarNombre() { return mostrarError(nombre, validarTexto(nombre.value.trim(), "Nombre", 100)); }
    function revisarDescripcion() { return mostrarError(descripcion, validarDescripcion(descripcion.value.trim())); }
    function revisarPrecio() { return mostrarError(precio, validarPrecio(precio.value)); }
    function revisarStock() { return mostrarError(stock, validarEntero(stock.value, "stock", true)); }
    function revisarCritico() { return mostrarError(stockCritico, validarEntero(stockCritico.value, "stock crítico", false)); }
    function revisarCategoria() { return mostrarError(categoria, validarSelect(categoria.value, "categoría")); }

    // ----- Alerta de stock crítico -----
    function revisarAvisoStock() {
        if (stock.value !== "" && stockCritico.value !== "" &&
            Number(stock.value) <= Number(stockCritico.value)) {
            avisoStock.textContent = "⚠ Atención: el stock está en nivel crítico. ¡Hay que reponer!";
        } else {
            avisoStock.textContent = "";
        }
    }

    // ----- En tiempo real -----
    codigo.addEventListener("input", revisarCodigo);
    nombre.addEventListener("input", revisarNombre);
    descripcion.addEventListener("input", revisarDescripcion);
    precio.addEventListener("input", revisarPrecio);
    stock.addEventListener("input", function () { revisarStock(); revisarAvisoStock(); });
    stockCritico.addEventListener("input", function () { revisarCritico(); revisarAvisoStock(); });
    categoria.addEventListener("change", revisarCategoria);

    revisarAvisoStock();   // por si al editar ya está en nivel crítico

    // ----- Al enviar -----
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const resultados = [
            revisarCodigo(),
            revisarNombre(),
            revisarDescripcion(),
            revisarPrecio(),
            revisarStock(),
            revisarCritico(),
            revisarCategoria()
        ];

        if (resultados.includes(false)) {
            return;
        }

        // Arma el producto con los datos del formulario
        const datos = {
            codigo: codigo.value.trim().toUpperCase(),
            nombre: nombre.value.trim(),
            descripcion: descripcion.value.trim(),
            precio: Number(precio.value),
            stock: Number(stock.value),
            stockCritico: stockCritico.value === "" ? null : Number(stockCritico.value),
            categoria: categoria.value,
            imagen: imagen.value.trim() || "img/logo.png"
        };

        if (productoEditar) {
            // EDITAR: reemplaza los datos del producto existente
            Object.assign(productoEditar, datos);
        } else {
            // CREAR: busca el id más alto y le suma 1
            let nuevoId = 1;
            productos.forEach(function (producto) {
                if (producto.id >= nuevoId) {
                    nuevoId = producto.id + 1;
                }
            });
            datos.id = nuevoId;
            productos.push(datos);
        }

        guardarProductos();
        alert("¡Producto guardado correctamente!");
        window.location.href = "productos.html";   // vuelve al listado
    });
}


// ===== AL CARGAR LA PÁGINA =====
mostrarResumen();
mostrarTablaProductos();
iniciarFormularioProducto();