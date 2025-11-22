package com.levelup.gaming.controllers;

import com.levelup.gaming.config.JwtService;
import com.levelup.gaming.models.User;
import com.levelup.gaming.repositories.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));
            // Authentication successful, fetch user
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow();
            String token = jwtService.generateToken(user.getEmail());
            user.setToken(token);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El correo electrónico ya está registrado.");
        }

        // Generate ID manually since @GeneratedValue is missing in User entity
        user.setId(java.util.UUID.randomUUID().toString());

        // Set default values if needed
        if (user.getRole() == null)
            user.setRole("user");
        if (user.getPoints() == 0)
            user.setPoints(0);

        // Generate referral code automatically
        String baseCode = user.getName().length() >= 3 ? user.getName().substring(0, 3).toUpperCase() : "USR";
        String refCode = "REF-" + baseCode + (int) (Math.random() * 10000);
        user.setReferralCode(refCode);
        user.setActive(true);

        // Save user (password is stored as plain text per current PasswordEncoder
        // config)
        User savedUser = userRepository.save(user);

        // Generate token
        String token = jwtService.generateToken(savedUser.getEmail());
        savedUser.setToken(token);

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(java.security.Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        return userRepository.findByEmail(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}/points")
    public ResponseEntity<?> updatePoints(@PathVariable String id, @RequestBody PointsUpdateDTO pointsUpdate) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setPoints(user.getPoints() + pointsUpdate.getPointsToAdd());
                    userRepository.save(user);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable String id, @RequestBody UserStatusUpdateDTO statusUpdate) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setActive(statusUpdate.isActive());
                    userRepository.save(user);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable String id, @RequestBody PasswordUpdateDTO passwordUpdate) {
        return userRepository.findById(id)
                .map(user -> {
                    // In a real app, we should check the old password here
                    user.setPassword(passwordUpdate.getNewPassword());
                    userRepository.save(user);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .map(user -> {
                    user.setPassword(request.getNewPassword());
                    userRepository.save(user);
                    return ResponseEntity.ok().body("Contraseña restablecida con éxito.");
                })
                .orElse(ResponseEntity.badRequest().body("Correo electrónico no encontrado."));
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    static class PointsUpdateDTO {
        private int pointsToAdd;
    }

    @Data
    static class UserStatusUpdateDTO {
        private boolean active;
    }

    @Data
    static class PasswordUpdateDTO {
        private String newPassword;
    }

    @Data
    static class ResetPasswordRequest {
        private String email;
        private String newPassword;
    }
}
