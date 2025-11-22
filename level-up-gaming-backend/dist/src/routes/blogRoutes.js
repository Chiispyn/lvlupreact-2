// level-up-gaming-backend/src/routes/blogRoutes.ts (COMPLETO Y CORREGIDO)
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _blogController = require("../controllers/blogController");
const _authMiddleware = require("../middleware/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// 🚨 RUTA 1: RUTA PÚBLICA DE LISTADO
router.get('/', _blogController.getBlogPosts); // GET /api/blog (Lista todos)
// 🚨 RUTA 2: RUTA PÚBLICA DE DETALLE (USA EL PARÁMETRO :id)
router.get('/:id', _blogController.getBlogPostById); // GET /api/blog/:id (Obtiene uno por ID)
// Rutas de Administración (CRUD) - Estas usan prefijos más específicos o métodos POST/PUT
router.post('/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _blogController.createBlogPost);
router.put('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _blogController.updateBlogPost);
router.delete('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _blogController.deleteBlogPost);
const _default = router;
