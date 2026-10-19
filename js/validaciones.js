// ============================================================
//  VALIDACIONES DE FORMULARIOS
// ============================================================

// Dominios de correo permitidos por el cliente
const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];


// ===== HERRAMIENTA 1: mostrar u ocultar el error de un campo =====
// Recibe el campo y el mensaje. Si el mensaje está vacío, el campo está OK.
// Devuelve true si el campo es válido, false si tiene error.
function mostrarError(campo, mensaje) {
    const cajaError = document.getElementById("error-" + campo.id);
    cajaError.textContent = mensaje;

    if (mensaje === "") {
        campo.classList.remove("invalido");
        campo.classList.add("valido");
        return true;
    } else {
        campo.classList.remove("valido");
        campo.classList.add("invalido");
        return false;
    }
}


// ===== HERRAMIENTA 2: validar un correo =====
// Devuelve el mensaje de error, o "" (vacío) si está bien.
function validarCorreo(valor, obligatorio) {
    if (valor === "") {
        if (obligatorio) {
            return "El correo es obligatorio.";
        }
        return "";   // es opcional y está vacío: está bien
    }

    if (valor.length > 100) {
        return "El correo no puede tener más de 100 caracteres.";
    }

    // Separa el correo en dos partes usando el @
    // "juan@gmail.com"  →  ["juan", "gmail.com"]
    const partes = valor.toLowerCase().split("@");

    if (partes.length !== 2 || partes[0] === "") {
        return "Escribe un correo válido, por ejemplo: juan@duoc.cl";
    }

    if (!DOMINIOS_PERMITIDOS.includes(partes[1])) {
        return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }

    return "";   // pasó todas las revisiones
}


// ===== HERRAMIENTA 3: validar un texto (obligatorio + largo máximo) =====
function validarTexto(valor, nombreCampo, maximo) {
    if (valor === "") {
        return "El campo " + nombreCampo + " es obligatorio.";
    }
    if (valor.length > maximo) {
        return nombreCampo + " no puede tener más de " + maximo + " caracteres.";
    }
    return "";
}


// ===== HERRAMIENTA 4: validar la contraseña =====
function validarContrasena(valor) {
    if (valor === "") {
        return "La contraseña es obligatoria.";
    }
    if (valor.length < 4 || valor.length > 10) {
        return "La contraseña debe tener entre 4 y 10 caracteres.";
    }
    return "";
}


// ===== HERRAMIENTA 5: limpiar los colores después de enviar =====
function limpiarFormulario(formulario) {
    formulario.reset();   // borra lo escrito
    formulario.querySelectorAll(".valido").forEach(function (campo) {
        campo.classList.remove("valido");
    });
}

// ===== HERRAMIENTA 6: validar el RUN chileno (módulo 11) =====
function validarRun(valor) {
    const run = valor.toUpperCase();   // por si escriben la k en minúscula

    if (run === "") {
        return "El RUN es obligatorio.";
    }
    if (run.includes(".") || run.includes("-")) {
        return "Escribe el RUN sin puntos ni guion. Ej: 123456785";
    }
    if (run.length < 7 || run.length > 9) {
        return "El RUN debe tener entre 7 y 9 caracteres.";
    }

    // Separa el cuerpo y el dígito verificador
    // "123456785"  →  cuerpo: "12345678"   dv: "5"
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    // El cuerpo solo puede tener números
    if (!/^[0-9]+$/.test(cuerpo)) {
        return "El RUN solo puede tener números (y una K al final).";
    }

    // Calcula el dígito verificador (módulo 11)
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador + 1;
        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resultado = 11 - (suma % 11);
    let dvEsperado;

    if (resultado === 11) {
        dvEsperado = "0";
    } else if (resultado === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = String(resultado);
    }

    if (dv !== dvEsperado) {
        return "El RUN no es válido. Revisa el dígito verificador.";
    }

    return "";
}


// ===== HERRAMIENTA 7: validar que se eligió una opción en un select =====
function validarSelect(valor, nombreCampo) {
    if (valor === "") {
        return "Selecciona una " + nombreCampo + ".";
    }
    return "";
}


// ===== HERRAMIENTA 8: validar fecha de nacimiento (opcional) =====
function validarFecha(valor) {
    if (valor === "") {
        return "";   // es opcional
    }
    if (new Date(valor) > new Date()) {
        return "La fecha de nacimiento no puede ser en el futuro.";
    }
    return "";
}


// ===== HERRAMIENTA 9: llenar región y conectar con comuna =====
function cargarRegiones(selectRegion, selectComuna) {

    // 1. Agrega una opción por cada región del arreglo
    regiones.forEach(function (region) {
        selectRegion.innerHTML += `<option value="${region.nombre}">${region.nombre}</option>`;
    });

    // 2. Cuando cambie la región, carga sus comunas
    selectRegion.addEventListener("change", function () {
        selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

        const regionElegida = regiones.find(function (region) {
            return region.nombre === selectRegion.value;
        });

        if (!regionElegida) {
            selectComuna.disabled = true;   // no eligió región: bloquea comuna
            return;
        }

        regionElegida.comunas.forEach(function (comuna) {
            selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });

        selectComuna.disabled = false;    // desbloquea comuna
    });
}


// ============================================================
//  LOGIN (login.html)
// ============================================================
function iniciarLogin() {
    const formulario = document.getElementById("form-login");
    if (!formulario) return;   // si no estamos en login.html, no hace nada

    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Funciones que revisan cada campo
    function revisarCorreo() {
        return mostrarError(correo, validarCorreo(correo.value.trim(), true));
    }
    function revisarContrasena() {
        return mostrarError(contrasena, validarContrasena(contrasena.value));
    }

    // 1. EN TIEMPO REAL: revisa mientras la persona escribe
    correo.addEventListener("input", revisarCorreo);
    contrasena.addEventListener("input", revisarContrasena);

    // 2. AL ENVIAR: revisa todo de nuevo
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();   // detiene el envío para revisar primero
        mensajeExito.textContent = "";

        const correoOk = revisarCorreo();
        const contrasenaOk = revisarContrasena();

        if (correoOk && contrasenaOk) {
            mensajeExito.textContent = "¡Inicio de sesión exitoso! Bienvenido a ComMangaVerse.";
            limpiarFormulario(formulario);
        }
    });
}

// ============================================================
//  CONTACTO (contacto.html)
// ============================================================
function iniciarContacto() {
    const formulario = document.getElementById("form-contacto");
    if (!formulario) return;

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const comentario = document.getElementById("comentario");
    const contador = document.getElementById("contador-comentario");
    const mensajeExito = document.getElementById("mensaje-exito");

    function revisarNombre() {
        return mostrarError(nombre, validarTexto(nombre.value.trim(), "Nombre", 100));
    }
    function revisarCorreo() {
        // false = el correo es OPCIONAL en contacto
        return mostrarError(correo, validarCorreo(correo.value.trim(), false));
    }
    function revisarComentario() {
        contador.textContent = comentario.value.length + " / 500";
        return mostrarError(comentario, validarTexto(comentario.value.trim(), "Comentario", 500));
    }

    // En tiempo real
    nombre.addEventListener("input", revisarNombre);
    correo.addEventListener("input", revisarCorreo);
    comentario.addEventListener("input", revisarComentario);

    // Al enviar
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        mensajeExito.textContent = "";

        const nombreOk = revisarNombre();
        const correoOk = revisarCorreo();
        const comentarioOk = revisarComentario();

        if (nombreOk && correoOk && comentarioOk) {
            mensajeExito.textContent = "¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.";
            limpiarFormulario(formulario);
            contador.textContent = "0 / 500";
        }
    });
}


// ============================================================
//  REGISTRO (registro.html)
// ============================================================
function iniciarRegistro() {
    const formulario = document.getElementById("form-registro");
    if (!formulario) return;

    const run = document.getElementById("run");
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const correo = document.getElementById("correo");
    const fecha = document.getElementById("fecha");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const direccion = document.getElementById("direccion");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Llena las regiones y conecta con las comunas
    cargarRegiones(region, comuna);

    // Una función de revisión por campo
    function revisarRun() { return mostrarError(run, validarRun(run.value.trim())); }
    function revisarNombre() { return mostrarError(nombre, validarTexto(nombre.value.trim(), "Nombre", 50)); }
    function revisarApellidos() { return mostrarError(apellidos, validarTexto(apellidos.value.trim(), "Apellidos", 100)); }
    function revisarCorreo() { return mostrarError(correo, validarCorreo(correo.value.trim(), true)); }
    function revisarFecha() { return mostrarError(fecha, validarFecha(fecha.value)); }
    function revisarRegion() { return mostrarError(region, validarSelect(region.value, "región")); }
    function revisarComuna() { return mostrarError(comuna, validarSelect(comuna.value, "comuna")); }
    function revisarDireccion() { return mostrarError(direccion, validarTexto(direccion.value.trim(), "Dirección", 300)); }

    // En tiempo real
    run.addEventListener("input", revisarRun);
    nombre.addEventListener("input", revisarNombre);
    apellidos.addEventListener("input", revisarApellidos);
    correo.addEventListener("input", revisarCorreo);
    fecha.addEventListener("change", revisarFecha);
    region.addEventListener("change", revisarRegion);
    comuna.addEventListener("change", revisarComuna);
    direccion.addEventListener("input", revisarDireccion);

    // Al enviar
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        mensajeExito.textContent = "";

        const resultados = [
            revisarRun(),
            revisarNombre(),
            revisarApellidos(),
            revisarCorreo(),
            revisarFecha(),
            revisarRegion(),
            revisarComuna(),
            revisarDireccion()
        ];

        // ¿Hay algún false en la lista? Entonces hay errores
        if (resultados.includes(false)) {
            return;
        }

        // Todo bien: guarda el usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        usuarios.push({
            run: run.value.trim().toUpperCase(),
            nombre: nombre.value.trim(),
            apellidos: apellidos.value.trim(),
            correo: correo.value.trim(),
            fechaNacimiento: fecha.value,
            region: region.value,
            comuna: comuna.value,
            direccion: direccion.value.trim(),
            tipo: "Cliente"
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensajeExito.textContent = "¡Cuenta creada con éxito! Ya puedes iniciar sesión.";
        limpiarFormulario(formulario);
        comuna.disabled = true;
    });
}

// ===== AL CARGAR LA PÁGINA =====
iniciarLogin();
iniciarContacto();
iniciarRegistro();