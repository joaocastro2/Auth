package com.example.auth.controller;

import com.example.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/request-token")
    public ResponseEntity<?> requestToken(@RequestBody Map<String, String> request) {
        String cnpj = request.get("cnpj");
        authService.generateToken(cnpj);
        return ResponseEntity.ok(Map.of("message", "Token enviado com sucesso!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String cnpj = payload.get("cnpj");
        String token = payload.get("token");
        String message = authService.verifyToken(cnpj, token);
        return ResponseEntity.ok(Map.of("message", message));
    }
}