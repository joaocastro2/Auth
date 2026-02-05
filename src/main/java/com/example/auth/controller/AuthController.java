package com.example.auth.controller;

import com.example.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/request-token")
    public ResponseEntity<String> requestToken(@RequestBody Map<String, String> request) {
        String cnpj = request.get("cnpj");
        try {
            authService.generateToken(cnpj);
            return ResponseEntity.ok("Token enviado com sucesso para o e-mail cadastrado.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
