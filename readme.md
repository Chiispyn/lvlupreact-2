# 🎮 Level-Up Gaming E-commerce

Este proyecto es una aplicación de comercio electrónico Fullstack para la tienda "Level-Up Gamer", un destino online para entusiastas de los videojuegos en Chile. El proyecto está desarrollado con React, TypeScript y Node.js/Express.

## ✨ Características Principales

- **Arquitectura Frontend/Backend Separada**: Desarrollo modular y escalable.
- **Persistencia de Datos sin Base de Datos**: Los datos de usuarios, órdenes, productos, blogs, eventos, recompensas y videos se guardan en archivos `.json`, sobreviviendo a reinicios del servidor. Las operaciones CRUD realizadas desde el panel de administración ahora se persisten en estos archivos.
- **Sistema de Cuentas de Usuario**: Registro, inicio de sesión y actualización de perfiles.
- **Gestión de Órdenes**: Creación y seguimiento de órdenes de compra.
- **Sistema de Puntos de Fidelidad**: Los usuarios ganan puntos por registrarse, por referidos y, más importante, **por cada compra realizada**.

## ⚙️ Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Vite, React Router | Interfaz de usuario dinámica y gestión de estado del lado del cliente. |
| **Backend** | Node.js, Express, TypeScript, SWC | Servidor API RESTful para gestionar usuarios, órdenes y productos. |
| **Estilos** | React-Bootstrap | Diseño responsivo con un tema oscuro y acentos de neón. |

---

## 💾 Persistencia de Datos (Backend)

Este proyecto **simula una base de datos utilizando archivos JSON**, lo que permite que los datos sean persistentes sin necesidad de configurar un motor de base de datos completo.

- **Ubicación**: `level-up-gaming-backend/src/db/`
- **Archivos**: 
    - `users.json`: Almacena todos los usuarios registrados, incluyendo el administrador de prueba. Aquí se actualizan los puntos de fidelidad.
    - `orders.json`: Almacena todas las órdenes de compra generadas.
    - `blog.json`: Almacena las entradas del blog.
    - `event.json`: Almacena los eventos.
    - `reward.json`: Almacena las recompensas.
    - `product.json`: Almacena los productos.
    - `video.json`: Almacena los videos.

Este enfoque hace que el proyecto sea completamente portable y funcional por sí mismo.

---

## 🚀 Cómo Ejecutar el Proyecto

El proyecto requiere que se ejecuten **dos servidores por separado**: uno para el Frontend y otro para el Backend.

### Requisitos
- **Node.js** (se recomienda v18 o superior)
- **npm** (generalmente se instala con Node.js)

### 1. Iniciar el Servidor Backend (Terminal 1)

```bash
# Navegar a la carpeta del backend
cd level-up-gaming-backend

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el servidor en modo de desarrollo (en http://localhost:5000)
npm run dev
```

### 2. Iniciar la Aplicación Frontend (Terminal 2)

```bash
# Navegar a la carpeta del frontend
cd level-up-gaming-frontend

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar la aplicación de React (en http://localhost:5173)
npm run dev
```

Una vez completados estos pasos, abre tu navegador y visita `http://localhost:5173`.

---

## 🧪 Cómo Ejecutar las Pruebas (Frontend)

Para ejecutar los tests unitarios y de integración del frontend, usa los siguientes comandos dentro de la carpeta `level-up-gaming-frontend`:

```bash
# Ejecutar los tests una vez en la terminal
npm test

# Ejecutar tests y abrir la UI de Vitest para una vista interactiva
npx vitest --ui

# Generar un reporte de cobertura de tests
npm test -- --coverage
```


Tests Implementados

Hemos agregado tests para la página AdminDashboard usando data-testid en los componentes críticos. Los tests verifican que:

Tarjetas de Administración (AdminCard) se renderizan correctamente:

card-products, card-orders, card-users, card-events, card-rewards, card-blog, card-videos.

Esto asegura que los enlaces a cada sección de administración existan.

Cards de Analítica se muestran correctamente:

card-total-revenue: Muestra los ingresos totales.

card-orders-today: Muestra la cantidad de órdenes de hoy.

card-top-product: Muestra el producto más vendido.

Alerta de Stock Bajo (alert-low-stock) se renderiza si hay productos con stock crítico.

Ejemplo de Test con Vitest / React Testing Library
import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('AdminDashboard', () => {
  test('renderiza todas las tarjetas de administración', () => {
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);
    expect(screen.getByTestId('card-products')).toBeInTheDocument();
    expect(screen.getByTestId('card-orders')).toBeInTheDocument();
    expect(screen.getByTestId('card-users')).toBeInTheDocument();
  });

  test('renderiza cards de analítica', () => {
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);
    expect(screen.getByTestId('card-total-revenue')).toBeInTheDocument();
    expect(screen.getByTestId('card-orders-today')).toBeInTheDocument();
    expect(screen.getByTestId('card-top-product')).toBeInTheDocument();
  });

  test('muestra alerta de stock bajo si hay productos críticos', async () => {
    render(<BrowserRouter><AdminDashboard /></BrowserRouter>);
    // Nota: Este test requiere que la API devuelva al menos un producto con stock <= 5
    const alert = await screen.findByTestId('alert-low-stock');
    expect(alert).toBeInTheDocument();
  });
});

Cómo Funciona Cada Test

render: Renderiza el componente en un entorno de pruebas simulando un navegador real.

screen.getByTestId: Busca un elemento por el atributo data-testid.

toBeInTheDocument: Asegura que el elemento realmente existe en el DOM.

findByTestId: Busca elementos que pueden aparecer después de una acción asíncrona (por ejemplo, datos cargados desde la API).

expect(...).toBeInTheDocument(): Compara que el componente esperado esté presente, garantizando que la UI se renderiza correctamente y los tests detecten fallos si algo no aparece.


agregar
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom por si no lo tiene 

---

## 🔧 Cambios recientes y mejoras añadidas

He añadido varias mejoras y refactorizaciones mientras trabajábamos en el proyecto. No modifiqué el contenido original del README para que sigas usándolo como material de estudio; aquí tienes un resumen claro de lo que se agregó y cómo verificarlo rápidamente:

- **Modularización del frontend**: Se centralizó la lógica de API en `src/services/` y se unificaron tipos y utilidades en `src/types` y `src/utils` (mejor separación de responsabilidades).
- **Corrección de entorno en Vite**: Reemplacé usos de `process.env` por `import.meta.env` en la configuración de la API para evitar errores en el navegador (p. ej. `ReferenceError: process is not defined`).
- **Tests reorganizados**: Los tests del frontend se movieron a `test/` (raíz del frontend) y la configuración de Vitest se ajustó para cargarlos desde ahí. Los tests actuales pasan localmente (ej.: `test/components/ProductCard.test.tsx`, `test/context/AuthContext.test.tsx`).
- **Autenticación segura (backend)**: Implementé autenticación con **bcrypt** para hashear contraseñas y **JWT** (`jsonwebtoken`) para emitir tokens. Ahora:
  - Registro y login almacenan/verifican contraseñas hasheadas.
  - Al iniciar sesión o registrarse, el backend devuelve un JWT.
- **Middleware de autenticación y roles**: Añadí `authMiddleware` y `isAdmin` en `level-up-gaming-backend/src/middleware/authMiddleware.ts` para validar tokens y controlar acceso por rol.
- **Protección de rutas admin**: Las rutas administrativas (`/admin`, `/:id/admin`, toggles de feature, etc.) ahora requieren JWT válido y rol `admin` (se aplicó a blogs, videos, eventos, recompensas y usuarios).
- **Frontend: envío automático del token**: `AuthContext` ahora configura `axios.defaults.headers.common['Authorization'] = 'Bearer <token>'` tras login/registro/actualización de perfil, y lo elimina al logout. Esto permite llamadas protegidas desde el cliente.
- **Pequeñas mejoras funcionales**: Lógicas como la gestión de estados de órdenes (evitar revertir estados a pasos anteriores) y confirmaciones de borrado en admin fueron añadidas/ajustadas en las páginas correspondientes.

## ✅ Cómo verificar rápidamente (comprobaciones recomendadas)

1. Backend

```powershell
cd level-up-gaming-backend
npm install
npm run dev
```

- Verifica en las respuestas de `/api/users/login` o `/api/users/register` que recibes un objeto `token` (JWT).
- Prueba una ruta protegida (p. ej. `POST /api/blog/admin`) sin token y confirma que devuelve `401` o `403`; vuelve a intentarlo con el header `Authorization: Bearer <token>` y debería permitir la acción si el usuario es admin.

2. Frontend

```powershell
cd level-up-gaming-frontend
npm install
npm run dev
```

- Inicia sesión con un usuario admin de prueba (revisa `level-up-gaming-backend/src/db/users.json` para el usuario de prueba si aplica).
- Abre DevTools → Application → Local Storage y confirma que `user.token` existe; en Network verifica que las solicitudes a rutas protegidas incluyen el header `Authorization`.

3. Tests (Frontend)

```powershell
cd level-up-gaming-frontend
npm test
```

- Los tests movidos deberían ejecutarse desde la carpeta `test/`.

## 🔒 Notas y recomendaciones

- Los datos siguen persistiendo en archivos JSON dentro de `level-up-gaming-backend/src/db/`. Para producción se recomienda migrar a una base de datos real.
- Si ya tenías usuarios en `users.json` con contraseñas en texto plano, deberías migrarlos (rehash) o forzar un cambio de contraseña — puedo añadir un script de migración si quieres.
- Actualmente el token se guarda en `localStorage` (útil para desarrollo). Si quieres, puedo cambiar el flujo para usar cookies HttpOnly y un refresh-token más seguro.

Si quieres que añada la migración de contraseñas, que proteja otras rutas o que implemente refresh tokens + cookies HttpOnly, dime cuál te interesa y lo hago a continuación.

---

## 📚 Guía rápida: qué hace el sitio y cómo usarlo

Esta guía añade un resumen práctico que puedes mantener en el README para documentar funciones, flujos de usuario y comandos útiles.

1) Funcionalidades principales (visibles en el frontend)

- **Home / Landing**: Presentación de la tienda, secciones destacadas de productos, videos y blog.
- **Catálogo de Productos**: Listado de productos con filtros, fichas de producto con imágenes, descripción, precio y botón para añadir al carrito.
- **Carrito de Compras**: Añadir/quitar productos, ver total y proceder al checkout (simulado en el proyecto).
- **Usuarios**: Registro, login, edición de perfil (dirección, contraseña), puntos de fidelidad y código de referido.
- **Blog y Videos**: Contenido multimedia y artículos con páginas de detalle.
- **Eventos y Recompensas**: Listado y gestión (las recompensas pueden canjearse con puntos en el flujo de administración o simulación).
- **Panel de Administración**: Accesible para usuarios con rol `admin`. Desde aquí se puede crear/editar/borrar productos, órdenes, usuarios, entradas de blog, videos, eventos y recompensas.

2) Flujos importantes

- **Registro → Puntos**: Al registrarse, el usuario recibe puntos de bienvenida; si es referido por otro usuario con código válido, el referido y el referente reciben puntos extra.
- **Login → Token**: Al iniciar sesión el backend devuelve un JWT. En desarrollo el token se guarda en `localStorage` (`user.token`) y `AuthContext` configura `axios` para incluirlo en llamadas protegidas.
- **Admin**: Para operar en rutas administrativas necesitas un usuario con `role: 'admin'`. Las rutas admin están protegidas con JWT + comprobación de rol (`isAdmin`).

3) Cómo usar (para desarrolladores y testers)

- Levantar backend (terminal):

```powershell
cd level-up-gaming-backend
npm install
npm run dev
```

- Levantar frontend (otra terminal):

```powershell
cd level-up-gaming-frontend
npm install
npm run dev
```

- Correr tests frontend:

```powershell
cd level-up-gaming-frontend
npm test
```

4) Endpoints API (resumen rápido)

- Usuarios
  - `POST /api/users/register` — crear usuario; devuelve token JWT
  - `POST /api/users/login` — login; devuelve token JWT
  - `PUT /api/users/profile` — actualizar perfil (protegido)
  - `GET /api/users` — listar usuarios (admin)
  - `POST /api/users/admin` — crear usuario por admin
  - `PUT /api/users/:id/admin` — editar usuario por admin
  - `PUT /api/users/:id/points` — ajustar puntos (admin)
  - `PUT /api/users/:id/status` — activar/desactivar usuario (admin)

- Blog
  - `GET /api/blog` — listar
  - `GET /api/blog/:id` — detalle
  - `POST /api/blog/admin` — crear (admin)
  - `PUT /api/blog/:id/admin` — actualizar (admin)
  - `DELETE /api/blog/:id/admin` — eliminar (admin)

- Videos, Eventos, Recompensas, Productos, Órdenes: siguen el mismo patrón `GET` público y rutas `/admin` protegidas para crear/editar/borrar.

5) Scripts útiles incluidos

- `npm run dev` (frontend/backend) — iniciar servidores en modo desarrollo.
- `node scripts/hash-users.js` — (backend) re-hashea contraseñas en `src/db/users.json` (crea backup automático). Útil cuando pasas a autenticación con bcrypt.

6) Variables de entorno importantes

- `JWT_SECRET` — secreto usado para firmar JWT (por defecto `dev-secret` si no está definido). Define en `.env` para desarrollo seguro.
- `VITE_API_URL` — URL base del backend usada por el frontend (accedida como `import.meta.env.VITE_API_URL`).

7) Notas de seguridad y recomendaciones

- Los datos se guardan en archivos JSON en `level-up-gaming-backend/src/db/`. Para producción, migrar a una base de datos real.
- Considera almacenar tokens en cookies HttpOnly y usar refresh tokens para producción; localStorage está bien para desarrollo pero es vulnerable a XSS.
- Revisa `users.json` y ejecuta `node scripts/hash-users.js` antes de habilitar la autenticación en entornos compartidos.

---

Si quieres, puedo formatear estas secciones en otro archivo `DOCS.md` o en la wiki del repo para mantener `readme.md` más ligero. ¿Prefieres que lo deje aquí o lo muevo a `DOCS.md`?
