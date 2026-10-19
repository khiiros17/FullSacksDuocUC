# ComMangaVerse

Tienda online de **cómics, mangas y novelas gráficas**, desarrollada como parte de la
**Evaluación Parcial 1** de la asignatura **DSY1104 – Desarrollo Fullstack II** (Duoc UC).

##  Integrantes del equipo

| Integrante | Rol / aporte principal |
|---|---|
| Javier miranda| [Ej: Estructura HTML, carrito y validaciones] |


##  Descripción del proyecto

**ComMangaVerse** es el frontend de una tienda online donde los usuarios pueden recorrer un
catálogo de cómics y mangas, ver el detalle de cada producto, agregarlo a un carrito de compras,
registrarse, iniciar sesión y enviar mensajes de contacto.

El proyecto incluye además un **panel de administrador** para gestionar los productos y los
usuarios de la tienda.

Esta es la **primera entrega**: todavía no hay backend ni base de datos. Los productos,
usuarios y el carrito se guardan en el navegador usando **localStorage**.

##  Tecnologías utilizadas

- **HTML5** con etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- **CSS3** en una hoja de estilos externa (`css/estilos.css`), con Flexbox, Grid y media queries
- **JavaScript** (sin frameworks) para validaciones, productos dinámicos, carrito y administrador
- **localStorage** para guardar el carrito, los productos y los usuarios
- **Git y GitHub** para el control de versiones y el trabajo colaborativo
- **Visual Studio Code** como editor de código

##  Estructura del proyecto

```
├── index.html               → Home: banner y productos destacados
├── productos.html           → Listado de todos los productos
├── detalle-producto.html    → Detalle de un producto (según ?id= en la URL)
├── carrito.html             → Carrito de compras con cantidades y total
├── login.html               → Inicio de sesión (con validaciones)
├── registro.html            → Registro de usuarios (con validaciones)
├── contacto.html            → Formulario de contacto (con validaciones)
├── nosotros.html            → Información de la tienda, video y equipo
├── blogs.html               → Listado de artículos del blog
├── blog1.html               → Artículo: Cómic vs Manga
├── blog2.html               → Artículo: Action Comics #1
│
├── admin/                   → Panel de administrador
│   ├── index.html           → Inicio del panel con resumen
│   ├── productos.html       → Listado de productos (editar / eliminar)
│   ├── producto-form.html   → Crear o editar un producto
│   ├── usuarios.html        → Listado de usuarios (editar / eliminar)
│   └── usuario-form.html    → Crear o editar un usuario
│
├── css/
│   └── estilos.css          → Hoja de estilos única para todo el sitio
│
├── js/
│   ├── productos.js         → Arreglo de productos, tarjetas y detalle
│   ├── carrito.js           → Lógica del carrito con localStorage
│   ├── validaciones.js      → Validaciones de formularios (login, registro, contacto)
│   ├── regiones.js          → Arreglo de regiones y comunas de Chile
│   └── admin.js             → Lógica del panel de administrador
│
└── img/                     → Imágenes de productos, banner, blogs y logo
```

##  Funcionalidades

### Tienda
- Productos mostrados dinámicamente con JavaScript desde un arreglo.
- Página de detalle única para todos los productos, usando parámetros en la URL (`?id=`).
- **Carrito de compras** guardado en localStorage:
  - Añadir productos (si ya existe, aumenta la cantidad).
  - Botones **+** y **−** para cambiar cantidades (al llegar a 0, se elimina).
  - Quitar productos, vaciar el carrito y cálculo de subtotales y total.
  - Contador del carrito visible en el header de todas las páginas.
- Blog con dos artículos y video embebido de YouTube.
- Diseño **responsivo** para computador, tablet y celular.

### Panel de administrador
- Menú lateral visible en todas las vistas.
- Resumen con total de productos, usuarios y productos en stock crítico.
- **Productos:** listar, crear, editar y eliminar. Alerta de **stock crítico**.
- **Usuarios:** listar, crear, editar y eliminar, con roles **Administrador, Vendedor y Cliente**.
- Los cambios del administrador se reflejan en la tienda.

##  Validaciones (JavaScript)

Todas las validaciones funcionan **en tiempo real** (mientras el usuario escribe) y también
al enviar el formulario, mostrando mensajes de error personalizados.

| Formulario | Validaciones |
|---|---|
| **Login** | Correo obligatorio, máx. 100 caracteres, solo `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`. Contraseña obligatoria de 4 a 10 caracteres. |
| **Contacto** | Nombre obligatorio (máx. 100). Correo opcional (máx. 100, dominios permitidos). Comentario obligatorio (máx. 500), con contador de caracteres. |
| **Registro / Usuario** | RUN obligatorio, sin puntos ni guion, de 7 a 9 caracteres, con **dígito verificador validado (módulo 11)**. Nombre (máx. 50), apellidos (máx. 100), correo, fecha de nacimiento opcional, región y comuna dependientes, dirección (máx. 300). Tipo de usuario solo en el administrador. |
| **Producto** | Código obligatorio (mín. 3), nombre (máx. 100), descripción opcional (máx. 500), precio ≥ 0 con decimales, stock entero ≥ 0, stock crítico opcional entero ≥ 0, categoría obligatoria, imagen opcional. |

**Reglas adicionales definidas por el equipo:**
- No se permiten dos productos con el mismo código.
- No se permiten dos usuarios con el mismo RUN.
- La fecha de nacimiento no puede ser una fecha futura.
- En el carrito, si la cantidad de un producto llega a 0, se elimina automáticamente.

##  Cómo ejecutar el proyecto

No requiere instalación ni servidor: es un sitio estático.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/khiiros17/FullSacksDuocUC.git
   ```
   o descárgalo como `.zip` desde GitHub y descomprímelo.
2. Abre el archivo `index.html` en tu navegador (doble clic).
3. Para entrar al panel de administrador, abre `admin/index.html`.

> **Nota:** como los datos se guardan en localStorage, si quieres volver a los productos
> originales, abre las herramientas del navegador (**F12 → Console**), escribe
> `localStorage.removeItem("productos")` y recarga la página.

##  Trabajo colaborativo

El proyecto se desarrolló en equipo usando un repositorio remoto en GitHub, con tareas
repartidas entre los integrantes y commits descriptivos que muestran cada etapa del desarrollo.
