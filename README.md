# Frontend JWT - Book Vault

Aplicación frontend construida con React + Vite para gestionar autenticación con JWT y un listado privado de libros. La app permite registrar usuarios, iniciar sesión, mantener la sesión mediante cookies y trabajar sobre una zona protegida donde se pueden crear y eliminar libros.

## Stack

- React 19
- Vite 8
- React Router DOM 7
- Axios
- ESLint

## Scripts disponibles

Desde la carpeta `front`:

```bash
npm install
npm run dev
```

Scripts del proyecto:

- `npm run dev`: arranca el servidor de desarrollo de Vite.


## Configuración

La API se resuelve desde `src/services/api.js` usando esta prioridad:

1. `VITE_API_URL`
2. `http://localhost:4000`

Ejemplo de `.env`:

```env
VITE_API_URL=http://localhost:4000
```

La instancia de Axios está configurada con `withCredentials: true`, así que el backend debe aceptar credenciales y manejar correctamente CORS si frontend y API están en dominios o puertos distintos.

## Funcionalidad

### Autenticación

- Registro de usuario en `/register`.
- Login en `/login`.
- Comprobación automática de sesión al arrancar la app con `GET /me`.
- Logout con `POST /logout`.
- Redirección automática según estado de autenticación.

### Gestión de libros

- Ruta protegida en `/books`.
- Carga inicial del listado desde la API.
- Alta de libros mediante formulario.
- Eliminación individual de libros.
- Mensajes de feedback para errores y acciones correctas.

## Rutas

Definidas en `src/App.jsx`:

- `/`: redirección automática a `/books` si hay sesión o a `/login` si no la hay.
- `/login`: solo accesible para invitados mediante `GuestRoute`.
- `/register`: solo accesible para invitados mediante `GuestRoute`.
- `/books`: ruta privada protegida por `ProtectedRoute`.
- `*`: cualquier ruta no válida redirige a `/`.

## Flujo de autenticación

El contexto global vive en `src/context/AuthProvider.jsx`.

- Al montar la aplicación, `refreshSession()` llama a `getMe()`.
- Si la sesión es válida, guarda el usuario en estado global.
- Si falla, limpia el usuario sin romper la app.
- `login()` actualiza el usuario tras autenticar.
- `register()` crea la cuenta y deja el login para el siguiente paso.
- `logout()` cierra sesión y limpia el estado local.

Hooks y contexto relacionados:

- `src/context/authContext.js`: crea el contexto.
- `src/context/useAuth.js`: hook de acceso al contexto.
- `src/context/AuthProvider.jsx`: proveedor con estado, acciones y control de carga.

## Servicios API

Centralizados en `src/services/api.js`.

Endpoints usados por el frontend:

- `POST /register`
- `POST /login`
- `GET /me`
- `POST /logout`
- `GET /books`
- `POST /books`
- `DELETE /books/:id`

El helper `request()` devuelve `response.data` y normaliza los errores mostrando `error.response?.data?.message` cuando existe.

## Componentes principales

### Layout y navegación

- `Header.jsx`: navegación principal y botón de logout cuando hay sesión.
- `HomeRedirect.jsx`: resuelve la ruta `/` según autenticación.
- `GuestRoute.jsx`: bloquea acceso a login/register si el usuario ya está autenticado.
- `ProtectedRoute.jsx`: impide entrar en `/books` sin sesión.

### Páginas

- `LoginPage.jsx`: formulario de acceso con control de carga y errores.
- `RegisterPage.jsx`: formulario de alta con mensaje de éxito y redirección a login.
- `BooksPage.jsx`: vista privada con formulario, listado y feedback de acciones.

### Libros

- `BookForm.jsx`: formulario para crear libros con campos `title`, `author`, `country`, `language`, `pages` y `year`.
- `BookList.jsx`: renderiza el listado, estados vacíos/carga y borrado por elemento.

## Estructura del proyecto

```text
front/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   ├── GuestRoute.jsx
│   │   ├── Header.jsx
│   │   ├── HomeRedirect.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthProvider.jsx
│   │   ├── authContext.js
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── BooksPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Arranque de la aplicación

El punto de entrada está en `src/main.jsx`:

- monta React en `#root`
- envuelve la app con `BrowserRouter`
- envuelve la app con `AuthProvider`

## Comportamiento esperado con backend

Para que el frontend funcione correctamente, el backend debe:

- exponer los endpoints listados arriba
- devolver mensajes de error en `response.data.message` cuando corresponda
- manejar autenticación basada en cookies o credenciales compatibles con `withCredentials`
- permitir CORS con credenciales si el frontend se ejecuta en otro origen

## Estado actual

El frontend ya cubre:

- registro
- login
- persistencia de sesión
- protección de rutas
- listado de libros
- creación de libros
- borrado de libros

No aparece en el código actual:

- edición de libros
- recuperación de contraseña
- tests automatizados
- gestión avanzada de roles
