package com.example.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "cnpj", nullable = false, unique = true)
    private String cnpj;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    private String token;
    @Column(name = "token_expiration")
    private LocalDateTime tokenExpiration;
}
