// level-up-gaming-backend/src/routes/productRoutes.ts (FINAL)

import express from 'express';
import {
    getProducts,
    getProductById,
    getTopProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas Públicas (GET)
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);

// Rutas de Administración (CRUD Protegido)
router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

export default router;