// level-up-gaming-backend/src/routes/orderRoutes.ts
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
const _orderController = require("../controllers/orderController");
const _authMiddleware = require("../middleware/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// 🚨 RUTA CRÍTICA PARA EL CHECKOUT (Requiere Autenticación)
router.post('/', _authMiddleware.authMiddleware, _orderController.addOrderItems); // POST /api/orders
// Historial de usuario (Requiere Autenticación)
router.get('/myorders', _authMiddleware.authMiddleware, _orderController.getMyOrders); // GET /api/orders/myorders
// Rutas de Administración (Requiere Admin)
router.get('/', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _orderController.getAllOrders); // GET /api/orders (Admin)
router.put('/:id/status', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _orderController.updateOrderStatus);
const _default = router;
