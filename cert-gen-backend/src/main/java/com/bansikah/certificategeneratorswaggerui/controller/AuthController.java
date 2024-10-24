package com.bansikah.certificategeneratorswaggerui.controller;

import com.bansikah.certificategeneratorswaggerui.model.LoginRequest;
import com.bansikah.certificategeneratorswaggerui.model.User;
import com.bansikah.certificategeneratorswaggerui.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.registerUser(user)) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}