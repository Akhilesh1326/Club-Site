package com.example.club_management.club_management_service.FeignClient;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;
@FeignClient(name="auth-service", url = "http://localhost:8080")
public interface clubServiceClient {
    @GetMapping("/auth-user/{email}")
    Map<String, Object> getAuthEmail(@PathVariable("email") String founderEmail);
}
