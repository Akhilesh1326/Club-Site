package com.example.api_gateway.Config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {

    @Bean
    public KeyResolver rateLimiterKeyResolver() {
        return exchange -> {
            String role = exchange.getRequest().getHeaders().getFirst("X-User-Role");
            if ("ADMIN".equals(role)) {
                return Mono.just("admin"); // Admins get a separate rate limit
            }

            return Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("X-User-ID"))
                    .switchIfEmpty(
                            Mono.justOrEmpty(exchange.getRequest().getRemoteAddress())
                                    .map(addr -> addr.getAddress().getHostAddress())
                    )
                    .defaultIfEmpty("anonymous"); // Default to "anonymous" if no user ID or IP
        };
    }
}
