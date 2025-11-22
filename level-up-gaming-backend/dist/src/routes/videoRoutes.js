// level-up-gaming-backend/src/routes/videoRoutes.ts
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
const _videoController = require("../controllers/videoController");
const _authMiddleware = require("../middleware/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Rutas Públicas (Lectura)
router.get('/featured', _videoController.getFeaturedVideos);
router.get('/', _videoController.getAllVideos);
// Rutas de Administración (CRUD)
router.post('/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _videoController.createVideo);
router.put('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _videoController.updateVideo);
router.delete('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _videoController.deleteVideo);
// 🚨 RUTA CRÍTICA AÑADIDA: PUT /api/videos/:id/feature (protegida)
router.put('/:id/feature', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _videoController.toggleVideoFeature);
const _default = router;
