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
            System.out.println("expiration - "+ claims.getExpiration().after(new Date()));
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            System.err.println("Invalid Token: " + e.getMessage()); // Logging
            return false;
        }
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

        // Bypass JWT authentication for public endpoints
        if (path.startsWith("/api/auth-service/register") ||
                path.startsWith("/api/auth-service/login") ||
                path.startsWith("/api/auth-service/greet")) {
            return chain.filter(exchange);
        }

        // Extract Token from Cookie
        String token = extractTokenFromCookie(request);
        if (token == null) {
            return onError(exchange.getResponse(), HttpStatus.UNAUTHORIZED, "Token not found in cookies");
        }

        // Validate Token
        if (!isTokenValid(token)) {
            return onError(exchange.getResponse(), HttpStatus.FORBIDDEN, "Invalid or Expired Token");
        }

        // Extract Claims & Set in Headers
        Claims claims = extractClaims(token);
        String userId = extractUserId(claims);
        String username = extractUsername(claims);
        String role = extractRole(claims);

        // Add extracted claims to the request headers
        ServerHttpRequest modifiedRequest = request.mutate()
                .header("userId", userId)
                .header("username", username)
                .header("role", role)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate().request(modifiedRequest).build();

        // Optional: Add to Response Headers (If required)
        modifiedExchange.getResponse().getHeaders().set("X-User-ID", userId);
        modifiedExchange.getResponse().getHeaders().set("X-Username", username);
        modifiedExchange.getResponse().getHeaders().set("X-User-Role", role);

        return chain.filter(modifiedExchange);
    }


    private String extractUserId(Claims claims) {
        return claims.get("userId", String.class);
    }

    private String extractRole(Claims claims) {
        return claims.get("role", String.class);
    }

    private String extractUsername(Claims claims) {
        return claims.getSubject();
    }



    private String extractTokenFromCookie(ServerHttpRequest request) {
        if (request.getCookies().containsKey("authToken")) {
            return request.getCookies().getFirst("authToken").getValue();
        }
        return null;
    }
}
