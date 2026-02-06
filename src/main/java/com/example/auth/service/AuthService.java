package com.example.auth.service;

import com.example.auth.model.CustomersModel;
import com.example.auth.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private CustomersRepository repository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private EmailService emailService;

    public void generateToken(String cnpj) {
        CustomersModel customers = repository.findByCnpj(cnpj)
                .orElseThrow(() -> new RuntimeException("CNPJ não encontrado"));

        String token = String.format("%06d", new Random().nextInt(999999));
        customers.setToken(token);
        customers.setTokenExpiration(LocalDateTime.now().plusMinutes(10));
        repository.save(customers);

        try {
            emailService.enviarTokenPolvo(customers.getEmail(), token);
        } catch (Exception e) {
            System.err.println("ERRO REAL AO ENVIAR E-MAIL: " + e.getMessage());
            e.printStackTrace(); // Isso vai cuspir o erro detalhado no seu console
            throw new RuntimeException("Falha no e-mail: " + e.getMessage());
        }
    }

    private void sendEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Seu Token de Acesso");
        message.setText("Seu código é: " + token);
        mailSender.send(message);
    }

    public String verifyToken(String cnpj, String token) {
        CustomersModel customer = repository.findByCnpj(cnpj)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        if (customer.getToken() == null || !customer.getToken().equals(token)) {
            throw new RuntimeException("Token inválido");
        }

        if (customer.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        customer.setToken(null);
        customer.setTokenExpiration(null);
        repository.save(customer);

        return "Login realizado com sucesso!";
    }
}
