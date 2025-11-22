"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get authMiddleware () {
        return authMiddleware;
    },
    get isAdmin () {
        return isAdmin;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const SECRET = process.env.JWT_SECRET || "dev-secret";
const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    // No viene header Authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No autorizado. Token faltante."
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = _jsonwebtoken.default.verify(token, SECRET);
        // Guardamos usuario en req.user
        req.user = {
            id: decoded.sub,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado."
        });
    }
};
const isAdmin = (req, res, next)=>{
    if (!req.user) {
        return res.status(401).json({
            message: "No autorizado."
        });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Acceso denegado. Requiere rol admin."
        });
    }
    next();
};
