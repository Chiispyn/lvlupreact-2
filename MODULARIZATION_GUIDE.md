# Documentación: Modularización del Proyecto

## 📋 Resumen de Cambios

El proyecto ha sido refactorizado para seguir una arquitectura modular con separación de responsabilidades:

### **Antes (Monolítico)**
- Las páginas contenían:
  - Llamadas directas a `axios`
  - URLs hardcodeadas (`/api/orders`, `/api/users`, etc.)
  - Interfaces y tipos definidos inline
  - Funciones formateras duplicadas

### **Después (Modular)**
- Estructura clara en capas:
  - **`/services`** - Lógica de API y llamadas HTTP
  - **`/types`** - Interfaces y tipos TypeScript
  - **`/utils`** - Funciones reutilizables (formatters, constantes)
  - **`/pages`** - Componentes visuales y lógica de presentación

---

## 📁 Estructura de Archivos

### **1. `/src/types/`** - Definiciones de Tipos
Cada entidad tiene su archivo de tipos:

```
types/
├── Order.ts          # Órdenes
├── Product.ts        # Productos
├── User.ts          # Usuarios
├── Blog.ts          # Posts de blog
├── Event.ts         # Eventos
├── Reward.ts        # Recompensas
├── Video.ts         # Videos
└── StatusMessage.ts # Mensaje de estado genérico
```

**Ventajas:**
- Sincronización fácil con Backend
- Reutilización en múltiples componentes
- Mejor intellisense en el IDE

---

### **2. `/src/services/`** - Lógica de API

#### **api.config.ts** (Configuración centralizada)
```typescript
// Define la URL base y todos los endpoints
export const API_ENDPOINTS = {
    ORDERS: `${API_BASE_URL}/orders`,
    USERS: `${API_BASE_URL}/users`,
    PRODUCTS: `${API_BASE_URL}/products`,
    ...
};
```

#### **Admin*Service.ts** (Servicios por entidad)
Ejemplo: `AdminOrderService.ts`
```typescript
export const AdminOrderService = {
    async fetchOrders(): Promise<Order[]> { ... },
    async fetchUsers(): Promise<User[]> { ... },
    async fetchOrdersAndUsers(): Promise<{ orders, users }> { ... },
    async updateOrderStatus(orderId, payload): Promise<Order> { ... },
};
```

**Servicios disponibles:**
- `AdminOrderService.ts` - Gestión de órdenes
- `AdminProductService.ts` - Gestión de productos
- `AdminUserService.ts` - Gestión de usuarios
- `AdminBlogService.ts` - Gestión de blog
- `AdminEventService.ts` - Gestión de eventos
- `AdminRewardService.ts` - Gestión de recompensas
- `AdminVideoService.ts` - Gestión de videos

---

### **3. `/src/utils/`** - Utilidades Compartidas

#### **constants.ts** (Constantes globales)
```typescript
// Estados, categorías, límites, etc.
export const ORDER_STATUS_OPTIONS = ['Pendiente', 'Procesando', ...];
export const REWARD_TYPES = ['Producto', 'Descuento', 'Envio'];
export const PRODUCT_CATEGORIES = [...];
export const MAX_PRODUCT_STOCK = 999;
export const MAX_PRODUCT_PRICE_CLP = 9999999;
```

#### **formatters.ts** (Funciones de formato)
```typescript
export const formatClp = (amount: number): string => { ... };
export const formatDate = (date: string | Date): string => { ... };
export const formatDateTime = (date: string | Date): string => { ... };
```

---

## 🔄 Flujo de Datos

### Antes (Página Monolítica)
```
Page Component
  ├─ axios.get('/api/orders')        ❌ Llamada directa
  ├─ axios.post('/api/orders')       ❌ Hardcoded
  ├─ inline interfaces               ❌ Duplicadas
  └─ formatters locales              ❌ Duplicadas
```

### Después (Página Modular)
```
Page Component
  ├─ imports AdminOrderService       ✅ Limpio
  ├─ imports { Order }               ✅ Tipos centralizados
  ├─ imports { formatClp }           ✅ Reutilizable
  ├─ AdminOrderService.fetchOrders()
  │  └─ AdminOrderService.ts
  │     └─ axios.get(API_ENDPOINTS.ORDERS)
  │        └─ api.config.ts
  │           └─ Configuración centralizada
  └─ Renderiza componente
```

---

## ✅ Ejemplo: Refactorización de AdminOrdersPage

### **Antes:**
```typescript
import axios from 'axios';

const API_ORDERS_URL = '/api/orders';
interface Order { ... }

const handleUpdateStatus = async (orderId, newStatus) => {
    const { data } = await axios.put(
        `${API_ORDERS_URL}/${orderId}/status`,
        { status: newStatus }
    );
    setOrders(orders.map(o => o.id === orderId ? data : o));
};
```

### **Después:**
```typescript
import AdminOrderService from '../services/AdminOrderService';
import { Order, OrderStatus } from '../types/Order';

const handleUpdateStatus = async (orderId, newStatus) => {
    const updatedOrder = await AdminOrderService.updateOrderStatus(
        orderId,
        { status: newStatus }
    );
    setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
};
```

---

## 📝 Cómo Agregar una Nueva Página Admin

### **Paso 1: Crear el Tipo** (`/src/types/NuevaEntidad.ts`)
```typescript
export interface NuevaEntidad {
    id: string;
    name: string;
    // ... otros campos
}

export interface NuevaEntidadPayload {
    name?: string;
    // ... campos opcionales para crear/actualizar
}
```

### **Paso 2: Crear el Servicio** (`/src/services/AdminNuevaEntidadService.ts`)
```typescript
import axios from 'axios';
import { NuevaEntidad, NuevaEntidadPayload } from '../types/NuevaEntidad';
import { API_ENDPOINTS } from './api.config';

export const AdminNuevaEntidadService = {
    async fetch(): Promise<NuevaEntidad[]> {
        const { data } = await axios.get(API_ENDPOINTS.NUEVA_ENTIDAD);
        return Array.isArray(data) ? data : [];
    },
    
    async create(payload: NuevaEntidadPayload): Promise<NuevaEntidad> {
        const { data } = await axios.post(API_ENDPOINTS.NUEVA_ENTIDAD, payload);
        return data;
    },
    
    async update(id: string, payload: NuevaEntidadPayload): Promise<NuevaEntidad> {
        const { data } = await axios.put(
            `${API_ENDPOINTS.NUEVA_ENTIDAD}/${id}`,
            payload
        );
        return data;
    },
    
    async delete(id: string): Promise<void> {
        await axios.delete(`${API_ENDPOINTS.NUEVA_ENTIDAD}/${id}`);
    },
};
```

### **Paso 3: Usar en la Página** (`/src/pages/AdminNuevaEntidadPage.tsx`)
```typescript
import AdminNuevaEntidadService from '../services/AdminNuevaEntidadService';
import { NuevaEntidad } from '../types/NuevaEntidad';
import { formatClp } from '../utils/formatters';

const AdminNuevaEntidadPage: React.FC = () => {
    const [items, setItems] = useState<NuevaEntidad[]>([]);
    
    const loadItems = async () => {
        try {
            const data = await AdminNuevaEntidadService.fetch();
            setItems(data);
        } catch (err) {
            setError('Error al cargar datos');
        }
    };
    
    useEffect(() => { loadItems(); }, []);
    
    // ... resto del componente
};
```

---

## 🔧 Actualizar una Página Existente

### **Checklist:**
1. ✅ Remover `import axios from 'axios'`
2. ✅ Remover URLs hardcodeadas
3. ✅ Agregar `import { TuServicio } from '../services/TuServicio'`
4. ✅ Agregar `import { TuTipo } from '../types/TuTipo'`
5. ✅ Reemplazar `axios.get()` con `TuServicio.fetch()`
6. ✅ Reemplazar `axios.post()` con `TuServicio.create()`
7. ✅ Reemplazar `new Date().toLocaleDateString()` con `formatDate()`
8. ✅ Reemplazar constantes hardcodeadas con imports de `utils/constants.ts`

---

## 📊 Beneficios de la Modularización

| Aspecto | Antes | Después |
|--------|-------|--------|
| **Mantenimiento** | Difícil (código duplicado) | Fácil (cambio centralizado) |
| **Testing** | Acoplado a página | Servicios independientes |
| **Reutilización** | Duplicación | Componentes reutilizables |
| **Performance** | No optimizado | Lazy loading posible |
| **Legibilidad** | Páginas de 500+ líneas | Páginas de <300 líneas |
| **Debugging** | Mezcla lógica + UI | Separación clara |

---

## 🚀 Próximos Pasos Recomendados

1. **Refactorizar páginas faltantes** (públicas):
   - `ProductsPage.tsx` → `ProductService.ts`
   - `BlogPage.tsx` → `BlogService.ts`
   - `CartPage.tsx` → `CartService.ts`

2. **Agregar error handling centralizado**:
   - Crear `services/errorHandler.ts`
   - Estandarizar respuestas de error

3. **Implementar caching**:
   - `services/cache.ts` para evitar llamadas repetidas

4. **Agregar validación centralizada**:
   - `utils/validators.ts` para validaciones de formularios

5. **Crear tests**:
   - `services/*.test.ts` para servicios
   - `__tests__/components/` para componentes

---

**Fecha de actualización:** 16/11/2025
**Versión:** 2.0 (Modularizado)
