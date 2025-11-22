package com.levelup.gaming.controllers;

import com.levelup.gaming.models.Blog;
import com.levelup.gaming.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog") // Note: Route is /api/blog not /api/blogs based on Node backend
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
}
