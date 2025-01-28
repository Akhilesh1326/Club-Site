package com.example.auth.auth_service.Service;


import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;



@Service
public class AuthUserService {
    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Auth_Users register(AuthUserDTO authUserDTO) {
        // Log the received password for debugging
        System.out.println("Received password: " + authUserDTO.getPassword());

        // Check if the email is already in use
        if (authUserRepository.findByEmail(authUserDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Auth_Users authUsers = new Auth_Users();
        authUsers.setEmail(authUserDTO.getEmail());

        // Log password before encoding to verify its value
        String rawPassword = authUserDTO.getPassword();
        System.out.println("Raw password before encoding: " + rawPassword);

        // Encode the password
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);

        authUsers.setPassword(encodedPassword); // Set the encoded password
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
