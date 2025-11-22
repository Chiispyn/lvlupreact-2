package com.levelup.gaming.dto;

import lombok.Data;

@Data
public class ProductUpdateDTO {
    private String name;
    private String description;
    private Double price; // Use wrapper types to allow null
    private String imageUrl;
    private String category;
    private Integer countInStock; // Use wrapper types to allow null
    private String specifications;
    private Boolean active; // Use wrapper types to allow null
}
