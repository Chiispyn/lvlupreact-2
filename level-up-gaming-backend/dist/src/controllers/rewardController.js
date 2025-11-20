// level-up-gaming-backend/src/controllers/rewardController.ts
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
    get createReward () {
        return createReward;
    },
    get deleteReward () {
        return deleteReward;
    },
    get getActiveRewards () {
        return getActiveRewards;
    },
    get getAllRewards () {
        return getAllRewards;
    },
    get updateReward () {
        return updateReward;
    }
});
const _rewardData = require("../data/rewardData");
const _uuid = require("uuid");
const _dbUtils = require("../utils/dbUtils");
// ----------------------------------------------------
// LECTURA (GET)
// ----------------------------------------------------
// @route   GET /api/rewards (Devuelve solo las ACTIVAS para el cliente)
const getActiveRewards = (req, res)=>{
    const activeRewards = (0, _rewardData.getRewards)().filter((r)=>r.isActive);
    res.json(activeRewards);
};
// @route   GET /api/rewards/admin (Devuelve TODAS para el administrador)
const getAllRewards = (req, res)=>{
    res.json((0, _rewardData.getRewards)());
};
// ----------------------------------------------------
// ADMINISTRACIÓN (CRUD)
// ----------------------------------------------------
// @route   POST /api/rewards/admin (Crear)
const createReward = (req, res)=>{
    const { name, type, pointsCost, description, isActive, season, imageUrl } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({
            message: 'El nombre debe tener al menos 3 caracteres.'
        });
    }
    if (!pointsCost || pointsCost < 1) {
        return res.status(400).json({
            message: 'El costo debe ser mayor a 0 puntos.'
        });
    }
    if (!imageUrl) {
        return res.status(400).json({
            message: 'Debe proporcionar una imagen para la recompensa.'
        });
    }
    const newReward = {
        id: (0, _uuid.v4)(),
        name: name,
        type: type,
        pointsCost: pointsCost,
        description: description,
        isActive: isActive !== undefined ? isActive : true,
        season: season || 'Standard',
        imageUrl: imageUrl
    };
    const rewards = (0, _rewardData.getRewards)();
    rewards.push(newReward);
    (0, _dbUtils.writeToDb)('reward', rewards);
    res.status(201).json(newReward);
};
// @route   PUT /api/rewards/:id/admin (Actualizar)
const updateReward = (req, res)=>{
    const { id } = req.params;
    const updateData = req.body;
    const rewards = (0, _rewardData.getRewards)();
    const rewardIndex = rewards.findIndex((r)=>r.id === id);
    if (rewardIndex !== -1) {
        if (updateData.name && updateData.name.length < 3) {
            return res.status(400).json({
                message: 'El nombre debe tener al menos 3 caracteres.'
            });
        }
        rewards[rewardIndex] = {
            ...rewards[rewardIndex],
            ...updateData,
            pointsCost: Number(updateData.pointsCost) || rewards[rewardIndex].pointsCost
        };
        (0, _dbUtils.writeToDb)('reward', rewards);
        res.json(rewards[rewardIndex]);
        return;
    }
    res.status(404).json({
        message: 'Recompensa no encontrada.'
    });
};
// @route   DELETE /api/rewards/:id/admin (Eliminar)
const deleteReward = (req, res)=>{
    const { id } = req.params;
    let rewards = (0, _rewardData.getRewards)();
    const initialLength = rewards.length;
    rewards = rewards.filter((r)=>r.id !== id);
    (0, _dbUtils.writeToDb)('reward', rewards);
    res.status(200).json({
        message: 'Recompensa eliminada.'
    });
};
