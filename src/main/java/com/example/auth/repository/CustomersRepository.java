package com.example.auth.repository;

import com.example.auth.model.CustomersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * An interface that extends jpaRepository (a data access layer,
 * eliminating the need to manually write SQL queries for common operations).
 * (CustomersModel, Long) --> Parameters for the customer data model
 * and the value in which the primary key was defined.
 */
@Repository
public interface CustomersRepository extends JpaRepository<CustomersModel, Long> {
    Optional<CustomersModel> findByCnpj(String cnpj); //Search for the customer by CNPJ (Brazilian company tax ID).
}
