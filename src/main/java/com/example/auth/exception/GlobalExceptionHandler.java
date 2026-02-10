package com.example.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

/**
 * It centralizes API error handling to ensure that the front-end
 * receive standardized and friendly responses, regardless of the error that occurred.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles authentication failures (invalid/expired token).
     */
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<Map<String, String>> handleAuthException(AuthException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage())); // Alterado de error para message
    }

    /**
     * It handles cases where the CNPJ (Brazilian company tax ID) provided does not exist in the database.
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage())); // Alterado de error para message
    }

    /**
     * It captures any errors not foreseen by the system.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Ocorreu um erro inesperado no servidor."));
    }
}
