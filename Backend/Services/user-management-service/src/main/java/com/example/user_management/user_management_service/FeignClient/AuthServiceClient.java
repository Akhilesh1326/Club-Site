package com.example.user_management.user_management_service.FeignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "auth-service", url = "http://localhost:8080")
public interface AuthServiceClient {

    @GetMapping("/auth-user/{id}")
    Map<String, Object> getAuthUser(@PathVariable("id") Long id);
}
