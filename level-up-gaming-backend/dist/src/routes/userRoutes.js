// level-up-gaming-backend/src/routes/userRoutes.ts
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
const _authMiddleware = require("../middleware/authMiddleware");
const _userController = require("../controllers/userController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Rutas Públicas y de Escritura
router.post('/login', _userController.authUser);
router.post('/register', _userController.registerUser);
router.put('/profile', _authMiddleware.authMiddleware, _userController.updateUserProfile);
// Rutas de Administración
router.get('/', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _userController.getUsers);
router.post('/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _userController.createUser);
router.put('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _userController.updateUserByAdmin);
// 🚨 RUTA CRÍTICA: PUT /api/users/:id/points
// Permite a los usuarios actualizar sus propios puntos y a los admins actualizar cualquier usuario
router.put('/:id/points', _authMiddleware.authMiddleware, _userController.updatePoints);
router.put('/:id/status', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _userController.toggleUserStatus);
const _default = router;
