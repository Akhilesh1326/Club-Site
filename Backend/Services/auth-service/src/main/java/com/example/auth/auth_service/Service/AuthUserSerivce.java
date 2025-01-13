package com.example.auth.auth_service.Service;


import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;



@Service
public class AuthUserSerivce {
    @Autowired
    private AuthUserRepository authUserRepository;
    private PasswordEncoder passwordEncoder;

    public Auth_Users register(AuthUserDTO authUserDTO) {
        // Check if the email is already in use
        if (authUserRepository.findByEmail(authUserDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Auth_Users authUsers = new Auth_Users();
        authUsers.setEmail(authUserDTO.getEmail());
            authUsers.setPassword(passwordEncoder.encode(authUserDTO.getPassword())); // Hash the password
        authUsers.setRole(convertToRoleEnum(authUserDTO.getRole())); // Convert String role to Enum
        authUsers.setCreatedAt(LocalDateTime.now());

        // Save the user to the database
        return authUserRepository.save(authUsers);
    }
    private Auth_Users.Role convertToRoleEnum(String role) {
        try {
            return Auth_Users.Role.valueOf(role); // Converts String to Enum (case-sensitive)
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }
    }

}
