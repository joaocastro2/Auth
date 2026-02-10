package com.example.auth.service;

import com.example.auth.exception.AuthException;
import com.example.auth.exception.UserNotFoundException;
import com.example.auth.model.CustomersModel;
import com.example.auth.repository.CustomersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;

/**
 * Service class: It encapsulates the application's business logic (separates the controller from the repository).
 */
@Service
public class AuthService {

    @Autowired
    private CustomersRepository repository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private EmailService emailService;

    public void generateToken(String cnpj) {

        /**
         * It reads the entered CNPJ (Brazilian company tax ID), checks if it exists in the database, and if not found,
         * displays "CNPJ NOT FOUND". If the CNPJ exists, a token is generated with a 10-minute expiration date.
         */
        CustomersModel customers = repository.findByCnpj(cnpj)
                .orElseThrow(() -> new UserNotFoundException("CNPJ não encontrado"));

        String token = String.format("%06d", new Random().nextInt(999999));
        customers.setToken(token);
        customers.setTokenExpiration(LocalDateTime.now().plusMinutes(10));
        repository.save(customers);

        /**
         * It uses the emailservice class, which associates the CNPJ (Brazilian company tax ID)
         * with the registered email and sends a message containing the token.
         */
        try {
            emailService.enviarTokenPolvo(customers.getEmail(), token);
        } catch (Exception e) {
            System.err.println("ERRO REAL AO ENVIAR E-MAIL: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Falha no e-mail: " + e.getMessage());
        }
    }

    /**
     * It processes the token sent by the user, checks if it matches the one sent,
     * if it hasn't expired, and performs the login. It uses "One-time use"; after successful login, the token is deleted.
     */
    @Transactional
    public String verifyToken(String cnpj, String token) {

        CustomersModel customer = repository.findByCnpj(cnpj)
                .orElseThrow(() -> new UserNotFoundException("CNPJ não encontrado em nossa base."));

        if (customer.getToken() == null || !customer.getToken().equals(token)) {
            throw new AuthException("O código digitado está incorreto.");
        }
        if (customer.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new AuthException("Este código já expirou. Peça um novo.");
        }
        customer.setToken(null);
        customer.setTokenExpiration(null);
        repository.save(customer);

        return "Login realizado com sucesso!";
    }
}
