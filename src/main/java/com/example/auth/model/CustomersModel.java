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

/**
 * Model class (each object refers to a column in the customers table)
 */
public class CustomersModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "cnpj", nullable = false, unique = true, updatable = false)
    private String cnpj;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "token")
    private String token; //token used for login validation
    @Column(name = "token_expiration")
    private LocalDateTime tokenExpiration;
}
