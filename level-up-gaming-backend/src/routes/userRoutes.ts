// level-up-gaming-backend/src/routes/userRoutes.ts

import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';
// 🚨 CORRECCIÓN: Cambiar la importación de 'addPoints' a 'updatePoints'
import { 
    authUser, 
    registerUser, 
    updateUserProfile, 
    getUsers, 
    createUser, 
    updateUserByAdmin, 
    updatePoints, // 🚨 Importación Correcta
    toggleUserStatus
} from '../controllers/userController'; 

const router = express.Router();

// Rutas Públicas y de Escritura
router.post('/login', authUser);
router.post('/register', registerUser);
router.put('/profile', authMiddleware, updateUserProfile); 

// Rutas de Administración
router.get('/', authMiddleware, isAdmin, getUsers); 
router.post('/admin', authMiddleware, isAdmin, createUser); 
router.put('/:id/admin', authMiddleware, isAdmin, updateUserByAdmin); 

// 🚨 RUTA CRÍTICA: PUT /api/users/:id/points
router.put('/:id/points', authMiddleware, isAdmin, updatePoints); // ✅ Uso de la función updatePoints
router.put('/:id/status', authMiddleware, isAdmin, toggleUserStatus);

export default router;