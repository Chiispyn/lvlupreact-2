// level-up-gaming-backend/src/controllers/orderController.ts
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
    get addOrderItems () {
        return addOrderItems;
    },
    get getAllOrders () {
        return getAllOrders;
    },
    get getMyOrders () {
        return getMyOrders;
    },
    get updateOrderStatus () {
        return updateOrderStatus;
    }
});
const _uuid = require("uuid");
const _dbUtils = require("../utils/dbUtils");
// ----------------------------------------------------
// LÓGICA DE CREACIÓN Y LECTURA DE ÓRDENES
// ----------------------------------------------------
const addOrderItems = (req, res)=>{
    const { items, shippingAddress, paymentMethod, totalPrice, shippingPrice } = req.body;
    const userId = req.user?.id;
    if (!items || items.length === 0) {
        return res.status(400).json({
            message: 'No hay artículos en la orden.'
        });
    }
    if (!userId) {
        return res.status(401).json({
            message: 'Usuario no autenticado para crear la orden.'
        });
    }
    let orders = (0, _dbUtils.readFromDb)('orders');
    if (!Array.isArray(orders)) {
        console.warn('Orders data is not an array, initializing as empty array.');
        orders = [];
    }
    const newOrder = {
        id: (0, _uuid.v4)(),
        userId: userId,
        items: items,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        shippingPrice: shippingPrice,
        isPaid: true,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
    };
    console.log('Type of orders before push:', typeof orders, 'Value:', orders);
    orders.push(newOrder);
    (0, _dbUtils.writeToDb)('orders', orders);
    // 2. Asignar puntos al usuario por la compra
    try {
        const users = (0, _dbUtils.readFromDb)('users');
        const userIndex = users.findIndex((u)=>u.id === userId);
        if (userIndex !== -1) {
            // Regla: 1 punto por cada $1000 CLP gastados en el total de la orden
            const pointsEarned = Math.floor(totalPrice / 1000);
            if (pointsEarned > 0) {
                users[userIndex].points += pointsEarned;
                (0, _dbUtils.writeToDb)('users', users);
            }
        }
    } catch (error) {
        console.error(`Error al asignar puntos al usuario ${userId} por la orden ${newOrder.id}:`, error);
    }
    res.status(201).json(newOrder);
};
const getMyOrders = (req, res)=>{
    const userIdToFilter = req.user?.id;
    const orders = (0, _dbUtils.readFromDb)('orders');
    if (!userIdToFilter) {
        return res.status(401).json({
            message: 'No autorizado'
        });
    }
    const userOrders = orders.filter((order)=>order.userId === userIdToFilter);
    res.json(userOrders);
};
const getAllOrders = (req, res)=>{
    const orders = (0, _dbUtils.readFromDb)('orders');
    res.json(orders);
};
const updateOrderStatus = (req, res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const orders = (0, _dbUtils.readFromDb)('orders');
    const orderIndex = orders.findIndex((o)=>o.id === id);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        (0, _dbUtils.writeToDb)('orders', orders);
        res.json(orders[orderIndex]);
        return;
    }
    res.status(404).json({
        message: 'Orden no encontrada.'
    });
};
