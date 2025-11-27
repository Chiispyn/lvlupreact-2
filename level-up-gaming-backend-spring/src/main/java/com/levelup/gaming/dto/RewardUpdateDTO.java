package com.levelup.gaming.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RewardUpdateDTO {
    private String name;
    private String type;
    private Integer pointsCost; // Wrapper type to allow null
    private String description;
    @JsonProperty("isActive")
    private Boolean isActive; // Wrapper type to allow null
    private String season;
    private String imageUrl;
    private String discountType; // "PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING", "NONE"
    private Double discountValue;
    private Integer stock;
    private Integer stockAvailable;
}
