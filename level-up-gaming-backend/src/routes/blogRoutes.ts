// level-up-gaming-backend/src/routes/blogRoutes.ts (COMPLETO Y CORREGIDO)

import express from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// 🚨 RUTA 1: RUTA PÚBLICA DE LISTADO
router.get('/', getBlogPosts);          // GET /api/blog (Lista todos)

// 🚨 RUTA 2: RUTA PÚBLICA DE DETALLE (USA EL PARÁMETRO :id)
router.get('/:id', getBlogPostById);    // GET /api/blog/:id (Obtiene uno por ID)

// Rutas de Administración (CRUD) - Estas usan prefijos más específicos o métodos POST/PUT
router.post('/admin', authMiddleware, isAdmin, createBlogPost); 
router.put('/:id/admin', authMiddleware, isAdmin, updateBlogPost); 
router.delete('/:id/admin', authMiddleware, isAdmin, deleteBlogPost); 

export default router;