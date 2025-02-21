package com.example.auth.auth_service.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for stateless authentication like JWT
                .authorizeRequests()
                .requestMatchers("/api/auth-service/register", "/api/auth-service/greet", "/api/auth-service/auth-user/id/**", "/api/auth-service/auth-user/name/**").permitAll() // Public endpoints
                .requestMatchers("/actuator/**").permitAll()  // Allow Eureka and monitoring
                .requestMatchers(HttpMethod.GET).permitAll()
                .anyRequest().authenticated() // Secure other endpoints
                .and()
                .cors(); // Enable CORS globally
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Using BCrypt for password hashing
    }
}
