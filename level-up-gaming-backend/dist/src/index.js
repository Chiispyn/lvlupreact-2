// level-up-gaming-backend/src/index.ts (CÓDIGO COMPLETO)
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("dotenv/config");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _productRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/productRoutes"));
const _userRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/userRoutes"));
const _orderRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/orderRoutes"));
const _blogRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/blogRoutes"));
const _eventRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/eventRoutes"));
const _videoRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/videoRoutes"));
const _rewardRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/rewardRoutes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PORT = process.env.PORT || 5000;
const app = (0, _express.default)();
// Middleware
app.use((0, _cors.default)());
app.use(_express.default.json({
    limit: '50mb'
}));
app.use(_express.default.urlencoded({
    limit: '50mb',
    extended: true
}));
// Rutas
app.get('/', (req, res)=>{
    res.send('API de Level-Up Gaming en Modo Mocking (SWC)!');
});
// Conexión de los módulos de la API
app.use('/api/products', _productRoutes.default);
app.use('/api/users', _userRoutes.default);
app.use('/api/orders', _orderRoutes.default);
app.use('/api/blog', _blogRoutes.default);
app.use('/api/events', _eventRoutes.default);
app.use('/api/videos', _videoRoutes.default); // 🚨 La última línea que puede fallar
app.use('/api/rewards', _rewardRoutes.default); // 🚨 La última línea que puede fallar
// Manejador de Errores
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send({
        message: err.message || 'Error interno del servidor'
    });
});
app.listen(PORT, ()=>{
    console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
