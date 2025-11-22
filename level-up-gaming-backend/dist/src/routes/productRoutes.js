// level-up-gaming-backend/src/routes/productRoutes.ts (FINAL)
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
const _productController = require("../controllers/productController");
const _authMiddleware = require("../middleware/authMiddleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Rutas Públicas (GET)
router.get('/', _productController.getProducts);
router.get('/top', _productController.getTopProducts);
router.get('/:id', _productController.getProductById);
// Rutas de Administración (CRUD Protegido)
router.post('/', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _productController.createProduct);
router.put('/:id', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _productController.updateProduct);
router.delete('/:id', _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _productController.deleteProduct);
const _default = router;
