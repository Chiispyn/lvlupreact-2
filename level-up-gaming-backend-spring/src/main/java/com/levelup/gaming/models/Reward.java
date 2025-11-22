package com.levelup.gaming.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String type;
    private String name;
    private int pointsCost;
    private String description;
    private boolean isActive;
    private String season;
    private String imageUrl;

    // Campos para descuentos dinámicos
    private String discountType; // "PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING", "NONE"
    private Double discountValue; // 0.15 para 15%, 5000 para $5000, null para otros tipos

    // Campos para control de stock
    private Integer stock; // Stock total (null = ilimitado)
    private Integer stockAvailable; // Stock disponible actual (null = ilimitado)
}
