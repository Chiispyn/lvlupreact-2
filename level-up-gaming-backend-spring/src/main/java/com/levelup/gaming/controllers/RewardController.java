package com.levelup.gaming.controllers;

import com.levelup.gaming.dto.RewardUpdateDTO;
import com.levelup.gaming.models.Reward;
import com.levelup.gaming.repositories.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "*")
public class RewardController {

    @Autowired
    private RewardRepository rewardRepository;

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    // 🚨 ENDPOINTS DE ADMINISTRACIÓN

    @GetMapping("/admin")
    public List<Reward> getAllRewardsForAdmin() {
        return rewardRepository.findAll();
    }

    @PostMapping("/admin")
    public Reward createReward(@RequestBody Reward reward) {
        return rewardRepository.save(reward);
    }

    @PutMapping("/{id}/admin")
    public ResponseEntity<Reward> updateReward(@PathVariable String id, @RequestBody RewardUpdateDTO rewardDetails) {
        return rewardRepository.findById(id)
                .map(reward -> {
                    if (rewardDetails.getName() != null)
                        reward.setName(rewardDetails.getName());
                    if (rewardDetails.getType() != null)
                        reward.setType(rewardDetails.getType());
                    if (rewardDetails.getPointsCost() != null)
                        reward.setPointsCost(rewardDetails.getPointsCost());
                    if (rewardDetails.getDescription() != null)
                        reward.setDescription(rewardDetails.getDescription());
                    if (rewardDetails.getActive() != null)
                        reward.setActive(rewardDetails.getActive());
                    if (rewardDetails.getSeason() != null)
                        reward.setSeason(rewardDetails.getSeason());
                    if (rewardDetails.getImageUrl() != null)
                        reward.setImageUrl(rewardDetails.getImageUrl());
                    if (rewardDetails.getDiscountType() != null)
                        reward.setDiscountType(rewardDetails.getDiscountType());
                    if (rewardDetails.getDiscountValue() != null)
                        reward.setDiscountValue(rewardDetails.getDiscountValue());
                    if (rewardDetails.getStock() != null)
                        reward.setStock(rewardDetails.getStock());
                    if (rewardDetails.getStockAvailable() != null)
                        reward.setStockAvailable(rewardDetails.getStockAvailable());
                    return ResponseEntity.ok(rewardRepository.save(reward));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/admin")
    public ResponseEntity<Void> deleteReward(@PathVariable String id) {
        if (rewardRepository.existsById(id)) {
            rewardRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para verificar disponibilidad de stock
    @GetMapping("/{id}/check-stock")
    public ResponseEntity<Boolean> checkStock(@PathVariable String id) {
        return rewardRepository.findById(id)
                .map(reward -> {
                    // Si stock es null, es ilimitado
                    if (reward.getStock() == null || reward.getStockAvailable() == null) {
                        return ResponseEntity.ok(true);
                    }
                    // Si hay stock disponible
                    return ResponseEntity.ok(reward.getStockAvailable() > 0);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
