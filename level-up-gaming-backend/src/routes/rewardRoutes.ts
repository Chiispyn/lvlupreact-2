// level-up-gaming-backend/src/routes/rewardRoutes.ts

import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
import {
  getActiveRewards,
  getAllRewards,
  createReward,
  updateReward,
  deleteReward,
} from "../controllers/rewardController";

const router = express.Router();

// Rutas públicas
router.get("/", getActiveRewards);

// Rutas admin
router.get("/admin", authMiddleware, isAdmin, getAllRewards);
router.post("/admin", authMiddleware, isAdmin, createReward);
router.put("/:id/admin", authMiddleware, isAdmin, updateReward);
router.delete("/:id/admin", authMiddleware, isAdmin, deleteReward);

export default router;
