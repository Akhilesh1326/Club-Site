package com.example.api_gateway.Config;

import com.example.api_gateway.Filter.JWTAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.server.WebFilter;

@Configuration
public class SecurityConfig {

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public WebFilter jwtAuthFilter(JWTAuthFilter jwtAuthFilter) {
        return jwtAuthFilter;
    }
}
