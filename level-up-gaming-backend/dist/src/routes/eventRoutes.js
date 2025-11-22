// level-up-gaming-backend/src/routes/eventRoutes.ts
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
const _eventController = require("../controllers/eventController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Rutas Públicas (Lectura)
router.get('/', _eventController.getEvents);
// Rutas de Administración (CRUD)
router.post('/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _eventController.createEvent);
router.put('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _eventController.updateEvent);
router.delete('/:id/admin', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _eventController.deleteEvent);
const _default = router;
