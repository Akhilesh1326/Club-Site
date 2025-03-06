package com.example.api_gateway.Filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTAuthFilter implements WebFilter {

    @Value("${jwt.secret}")
    private String secretKey;

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())  // ✅ Corrected parser usage
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isTokenValid(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            System.err.println("Invalid Token: " + e.getMessage()); // Logging
            return false;
        }
    }

    private String extractUserId(Claims claims) {
        return claims.getSubject(); // Assuming User ID is stored as "sub"
    }

    private Mono<Void> onError(ServerHttpResponse response, HttpStatus status, String message) {
        response.setStatusCode(status);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String errorJson = "{\"error\": \"" + message + "\"}";
        return response.writeWith(Mono.just(response.bufferFactory().wrap(errorJson.getBytes(StandardCharsets.UTF_8))));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // ✅ Bypass JWT authentication for public endpoints
        if (path.startsWith("/api/auth-service/register") ||
                path.startsWith("/api/auth-service/login") ||
                path.startsWith("/api/auth-service/greet")) {
            return chain.filter(exchange);
        }

        // ✅ Check Authorization Header
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return onError(exchange.getResponse(), HttpStatus.UNAUTHORIZED, "Invalid Authorization Header");
        }

        // ✅ Extract and Validate Token
        String token = authHeader.substring(7);
        if (!isTokenValid(token)) {
            return onError(exchange.getResponse(), HttpStatus.FORBIDDEN, "Invalid or Expired Token");
        }

        // ✅ Extract User ID & Set in Headers
        Claims claims = extractClaims(token);
        String userId = extractUserId(claims);

        ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-ID", userId)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate().request(modifiedRequest).build();

        // ✅ Set X-User-ID in Response (Optional)
        modifiedExchange.getResponse().getHeaders().set("X-User-ID", userId);

        return chain.filter(modifiedExchange);
    }
}
