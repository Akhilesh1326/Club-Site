package com.example.user_management.user_management_service.CustomeException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleUserAlreadyExistsException(UserAlreadyExistsException ex){
        Map<String, String> res = new HashMap<>();
        res.put("error", "Conflict");
        res.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
    }
}
