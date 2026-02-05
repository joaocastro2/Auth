package com.example.auth.repository;

import com.example.auth.model.CustomersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomersRepository extends JpaRepository<CustomersModel, Long> {
    Optional<CustomersModel> findByCnpj(String cnpj);
}
