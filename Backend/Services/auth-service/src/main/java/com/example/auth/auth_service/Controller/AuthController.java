package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth-service")
public class AuthController {

    @Autowired
    private AuthUserService authUserSerivce;
    @Autowired
    private AuthUserRepository authUserRepository;

    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "hello world");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerAuthUser(@RequestBody AuthUserDTO authUserDTO) {

        Auth_Users registeredUser = authUserSerivce.register(authUserDTO);


        // Create a response map to send back necessary details
        Map<String, Object> response = new HashMap<>();
        response.put("id", registeredUser.getUserId());
        response.put("email", registeredUser.getEmail());
        response.put("password", registeredUser.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email")
    public ResponseEntity<String> getEmailById(@RequestParam Long id) {
        // Call the repository or service method to fetch the email by ID
        Optional<Auth_Users> user = authUserRepository.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getEmail());  // Return email if user exists
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


}
