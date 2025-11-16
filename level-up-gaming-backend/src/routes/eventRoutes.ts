// level-up-gaming-backend/src/routes/eventRoutes.ts

import express from 'express';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';

const router = express.Router();

// Rutas Públicas (Lectura)
router.get('/', getEvents); 

// Rutas de Administración (CRUD)
router.post('/admin', authMiddleware, isAdmin, createEvent); 
router.put('/:id/admin', authMiddleware, isAdmin, updateEvent); 
router.delete('/:id/admin', authMiddleware, isAdmin, deleteEvent); 

export default router;