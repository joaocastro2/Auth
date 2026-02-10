package com.example.auth.controller;

import com.example.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth") //mapping for requests
@CrossOrigin(origins = "http://localhost:5173") //authorizes requests coming from the front-end
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * It processes all the service logic and, if true, sends the token.
     */
    @PostMapping("/request-token")
    public ResponseEntity<?> requestToken(@RequestBody Map<String, String> request) {
        String cnpj = request.get("cnpj");
        authService.generateToken(cnpj);
        return ResponseEntity.ok(Map.of("message", "Token enviado com sucesso!"));
    }

    /**
     * It processes all the service logic and, if true, Log in.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String cnpj = payload.get("cnpj");
        String token = payload.get("token");
        String message = authService.verifyToken(cnpj, token);
        return ResponseEntity.ok(Map.of("message", message));
    }
}