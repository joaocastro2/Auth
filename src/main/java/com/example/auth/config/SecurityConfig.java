package com.example.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


/**
 * Application Security Configuration.
 * Defines the rules for endpoint access, CORS policies, and CSRF.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configure which routes are public and which require authentication.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                )

                .cors(Customizer.withDefaults());

        return http.build();
    }

    /**
     * Provider of in-memory user details.
     * Set to empty to override the default Spring Security configuration.
     * since the authentication logic is managed customarily in the AuthService.
     */
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        return new InMemoryUserDetailsManager();
    }
}
