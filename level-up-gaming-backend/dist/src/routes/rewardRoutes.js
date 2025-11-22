// level-up-gaming-backend/src/routes/rewardRoutes.ts
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
const _rewardController = require("../controllers/rewardController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Rutas públicas
router.get("/", _rewardController.getActiveRewards);
// Rutas admin
router.get("/admin", _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _rewardController.getAllRewards);
router.post("/admin", _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _rewardController.createReward);
router.put("/:id/admin", _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _rewardController.updateReward);
router.delete("/:id/admin", _authMiddleware.authMiddleware, _authMiddleware.isAdmin, _rewardController.deleteReward);
const _default = router;
