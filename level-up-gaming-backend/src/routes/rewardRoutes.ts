// level-up-gaming-backend/src/routes/rewardRoutes.ts (VERIFICACIÓN COMPLETA)

import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';
import { getActiveRewards, getAllRewards, createReward, updateReward, deleteReward } from '../controllers/rewardController';

const router = express.Router();

// Rutas Públicas
router.get('/', getActiveRewards); // GET /api/rewards

// Rutas de Administración
router.get('/admin', authMiddleware, isAdmin, getAllRewards);
router.post('/admin', authMiddleware, isAdmin, createReward);
router.put('/:id/admin', authMiddleware, isAdmin, updateReward);
router.delete('/:id/admin', authMiddleware, isAdmin, deleteReward);

export default router; // ✅ Exportación correcta