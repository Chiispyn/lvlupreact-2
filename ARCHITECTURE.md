# 🏗️ Arquitectura Modular - Diagrama

## Flujo de Datos (Antes vs Después)

### ❌ ANTES (Monolítico)
```
AdminOrdersPage.tsx (500+ líneas)
├─ import axios
├─ const API_URL = '/api/orders'
├─ interface Order { ... }
├─ const formatClp = () => { ... }
├─ const handleFetch = async () => {
│  └─ axios.get(API_URL) ❌ Hardcodeado
├─ const handleCreate = async () => {
│  └─ axios.post(API_URL) ❌ Hardcodeado
└─ Renderizar UI
```

### ✅ DESPUÉS (Modular)
```
AdminOrdersPage.tsx (250-300 líneas)
├─ import AdminOrderService
├─ import { Order } from '../types/Order'
├─ import { formatClp } from '../utils/formatters'
├─ const handleFetch = async () => {
│  └─ AdminOrderService.fetchOrders()
│     └─ AdminOrderService.ts
│        ├─ axios.get(API_ENDPOINTS.ORDERS)
│        └─ Manejo de errores centralizado
├─ const handleCreate = async () => {
│  └─ AdminOrderService.createOrder()
└─ Renderizar UI
```

---

## Estructura de Carpetas Actual

```
level-up-gaming-frontend/
│
├── src/
│   │
│   ├── services/                      🔧 LÓGICA API (Nuevo)
│   │   ├── api.config.ts             ← Endpoints centralizados
│   │   │   export const API_ENDPOINTS = {
│   │   │       ORDERS: `/api/orders`,
│   │   │       USERS: `/api/users`,
│   │   │       ...
│   │   │   }
│   │   │
│   │   ├── Admin*.ts                 ← Servicios Admin (CRUD)
│   │   │   ├── AdminOrderService.ts
│   │   │   ├── AdminProductService.ts
│   │   │   ├── AdminUserService.ts
│   │   │   ├── AdminBlogService.ts
│   │   │   ├── AdminEventService.ts
│   │   │   ├── AdminRewardService.ts
│   │   │   └── AdminVideoService.ts
│   │   │
│   │   └── *.ts (Público)            ← Servicios Públicos (Lectura)
│   │       ├── ProductService.ts
│   │       ├── BlogService.ts
│   │       ├── EventService.ts
│   │       ├── VideoService.ts
│   │       ├── RewardService.ts
│   │       └── OrderService.ts
│   │
│   ├── types/                         📝 INTERFACES (Centralizado)
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   ├── Blog.ts
│   │   ├── Event.ts
│   │   ├── Reward.ts
│   │   ├── Video.ts
│   │   └── StatusMessage.ts
│   │
│   ├── utils/                         ⚙️ UTILIDADES (Reutilizable)
│   │   ├── formatters.ts
│   │   │   export const formatClp = ()
│   │   │   export const formatDate = ()
│   │   │   export const formatDateTime = ()
│   │   │
│   │   ├── constants.ts
│   │   │   export const ORDER_STATUS_OPTIONS
│   │   │   export const REWARD_TYPES
│   │   │   export const PRODUCT_CATEGORIES
│   │   │   export const MAX_PRODUCT_STOCK
│   │   │   export const MAX_PRODUCT_PRICE_CLP
│   │   │
│   │   ├── regionUtils.ts            (Existente)
│   │   └── userUtils.ts              (Existente)
│   │
│   ├── pages/                         🎨 UI (Presentación)
│   │   ├── AdminOrdersPage.tsx        ✅ Refactorizado
│   │   ├── AdminProductsPage.tsx      ⏳ Parcial
│   │   ├── AdminBlogPage.tsx          ⏳ Pendiente
│   │   ├── AdminEventsPage.tsx        ⏳ Pendiente
│   │   ├── AdminRewardsPage.tsx       ⏳ Pendiente
│   │   ├── AdminUsersPage.tsx         ⏳ Pendiente
│   │   ├── AdminVideosPage.tsx        ⏳ Pendiente
│   │   ├── ProductsPage.tsx           ⏳ Pendiente
│   │   ├── BlogPage.tsx               ⏳ Pendiente
│   │   └── ...
│   │
│   ├── components/                    
│   ├── context/
│   ├── layouts/
│   ├── routes/
│   ├── data/
│   ├── assets/
│   └── App.tsx
│
├── MODULARIZATION_GUIDE.md            📚 Documentación
├── MODULARIZATION_STATUS.md           📊 Estado Actual
└── package.json
```

---

## Patrones de Comunicación

### Patrón 1: Admin (CRUD Completo)

```typescript
// 1️⃣ En la Página
import AdminOrderService from '../services/AdminOrderService';
import { Order } from '../types/Order';

const [orders, setOrders] = useState<Order[]>([]);

// 2️⃣ Cargar datos
const loadOrders = async () => {
    const data = await AdminOrderService.fetchOrders();
    setOrders(data);
};

// 3️⃣ Crear
const handleCreate = async (payload) => {
    const newOrder = await AdminOrderService.createOrder(payload);
    setOrders([...orders, newOrder]);
};

// 4️⃣ Actualizar
const handleUpdate = async (id, payload) => {
    const updated = await AdminOrderService.updateOrder(id, payload);
    setOrders(orders.map(o => o.id === id ? updated : o));
};

// 5️⃣ Eliminar
const handleDelete = async (id) => {
    await AdminOrderService.deleteOrder(id);
    setOrders(orders.filter(o => o.id !== id));
};
```

### Patrón 2: Público (Lectura Únicamente)

```typescript
// 1️⃣ En la Página
import ProductService from '../services/ProductService';
import { Product } from '../types/Product';

const [products, setProducts] = useState<Product[]>([]);

// 2️⃣ Cargar datos (solo lectura)
const loadProducts = async () => {
    const data = await ProductService.fetchAllProducts();
    setProducts(data);
};

// 3️⃣ Búsqueda / Filtrado
const handleSearch = async (query) => {
    const results = await ProductService.searchProducts(query);
    setProducts(results);
};

// 4️⃣ Categorías
const handleCategoryFilter = async (category) => {
    const filtered = await ProductService.fetchByCategory(category);
    setProducts(filtered);
};
```

---

## Ventajas de la Nueva Arquitectura

| Aspecto | Ventaja |
|--------|---------|
| **URL Centralizada** | Cambios en una sola línea (`api.config.ts`) |
| **Tipos Centralizados** | Sincronización fácil con Backend |
| **Funciones Reutilizables** | `formatClp()` disponible en toda la app |
| **Manejo de Errores** | Consistente en todos los servicios |
| **Testing** | Servicios independientes y mockeables |
| **Escalabilidad** | Agregar nuevas entidades es simple |
| **Código Limpio** | Páginas -50% de líneas de código |

---

## Ejemplo Práctico: Cambio Global

### Escenario: Cambiar la URL del API

#### ❌ ANTES (Monolítico)
```typescript
// Buscar y reemplazar en:
// ❌ AdminOrdersPage.tsx
// ❌ AdminProductsPage.tsx
// ❌ AdminBlogPage.tsx
// ❌ ProductsPage.tsx
// ❌ BlogPage.tsx
// ❌ ... 20+ archivos más

// En cada archivo:
const API_URL = 'https://new-api.com/api/orders'; // ❌ Repetir en cada página
```

#### ✅ DESPUÉS (Modular)
```typescript
// Cambiar una sola línea en api.config.ts:
export const API_BASE_URL = 'https://new-api.com/api'; // ✅ Un solo cambio

// Automáticamente se actualiza en:
// ✅ AdminOrderService.ts
// ✅ AdminProductService.ts
// ✅ ProductService.ts
// ✅ ... todos los servicios
```

---

## Relaciones entre Capas

```
┌─────────────────────────────────────────────────────────┐
│                  UI Layer (Pages)                       │
│  AdminOrdersPage.tsx, ProductsPage.tsx, etc.           │
└──────────────────┬──────────────────────────────────────┘
                   │ imports
                   ▼
┌─────────────────────────────────────────────────────────┐
│              Services Layer (Lógica API)                │
│  AdminOrderService, ProductService, etc.               │
│  - Manejo de errores                                   │
│  - Transformación de datos                             │
│  - Caché (futuro)                                      │
└──────────────────┬──────────────────────────────────────┘
                   │ imports
                   ▼
┌─────────────────────────────────────────────────────────┐
│           API Config Layer (Configuración)             │
│  - API_ENDPOINTS (URLs centralizadas)                 │
│  - Configuración global de axios                       │
└──────────────────┬──────────────────────────────────────┘
                   │ uses
                   ▼
┌─────────────────────────────────────────────────────────┐
│              HTTP Client (axios)                        │
│  Comunicación con Backend                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Types Layer (Interfaces)                   │
│  Order.ts, Product.ts, User.ts, etc.                   │
│  - Tipos compartidos                                   │
│  - Type Safety                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Utils Layer (Utilidades)                   │
│  - formatters.ts (funciones de formato)               │
│  - constants.ts (constantes globales)                 │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist para Refactorizar una Página

```
□ Crear/Verificar tipos en /types
□ Crear/Verificar servicio en /services
□ Remover: import axios
□ Remover: const API_URL = '...'
□ Remover: interface definitions inline
□ Agregar: import AdminService from '../services'
□ Agregar: import { TipoEntity } from '../types'
□ Agregar: import { formatClp, formatDate } from '../utils/formatters'
□ Reemplazar: axios.get() → AdminService.fetch()
□ Reemplazar: axios.post() → AdminService.create()
□ Reemplazar: axios.put() → AdminService.update()
□ Reemplazar: axios.delete() → AdminService.delete()
□ Reemplazar: new Date().toLocaleDateString() → formatDate()
□ Reemplazar: const [status, setStatus] en URLs → usar constantes
□ Probar cambios
□ Commit con mensaje claro
```

---

**Última actualización:** 16 de Noviembre de 2025
