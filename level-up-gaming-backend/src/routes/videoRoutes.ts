// level-up-gaming-backend/src/routes/videoRoutes.ts

import express from 'express';
// 🚨 Asegurar que TODAS las funciones requeridas, incluyendo toggleVideoFeature, sean importadas
import { getFeaturedVideos, getAllVideos, createVideo, updateVideo, deleteVideo, toggleVideoFeature } from '../controllers/videoController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas Públicas (Lectura)
router.get('/featured', getFeaturedVideos); 
router.get('/', getAllVideos);             

// Rutas de Administración (CRUD)
router.post('/admin', authMiddleware, isAdmin, createVideo); 
router.put('/:id/admin', authMiddleware, isAdmin, updateVideo); 
router.delete('/:id/admin', authMiddleware, isAdmin, deleteVideo); 

// 🚨 RUTA CRÍTICA AÑADIDA: PUT /api/videos/:id/feature (protegida)
router.put('/:id/feature', authMiddleware, isAdmin, toggleVideoFeature); 
export default router;