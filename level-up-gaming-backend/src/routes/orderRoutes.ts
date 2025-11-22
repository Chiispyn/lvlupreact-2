
// level-up-gaming-backend/src/routes/orderRoutes.ts

import express from 'express';
import { addOrderItems, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// 🚨 RUTA CRÍTICA PARA EL CHECKOUT (Requiere Autenticación)
router.post('/', authMiddleware, addOrderItems);    // POST /api/orders

// Historial de usuario (Requiere Autenticación)
router.get('/myorders', authMiddleware, getMyOrders); // GET /api/orders/myorders

// Rutas de Administración (Requiere Admin)
router.get('/', authMiddleware, isAdmin, getAllOrders); // GET /api/orders (Admin)
router.put('/:id/status', authMiddleware, isAdmin, updateOrderStatus);

export default router;
