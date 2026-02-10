package com.example.auth.exception;

/**
 * Exceção personalizada para erros de regra de negócio durante a autenticação.
 */
public class AuthException extends RuntimeException{
    public AuthException (String message){
        super(message);
    }
}
