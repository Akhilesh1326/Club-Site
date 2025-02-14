package com.example.auth.auth_service.Service;


import com.example.auth.auth_service.CustomException.EmailAlreadyExistsException;
import com.example.auth.auth_service.CustomException.UserNameAlreadyExistsException;
import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;



@Service
public class AuthUserService {
    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Auth_Users register(AuthUserDTO authUserDTO) {

        if (authUserRepository.findByEmail(authUserDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if(authUserRepository.findByUserName(authUserDTO.getUserName()).isPresent()) {
            throw new UserNameAlreadyExistsException("Username already exists");
        }


        Auth_Users authUsers = new Auth_Users();
        authUsers.setEmail(authUserDTO.getEmail());
        authUsers.setUserName(authUserDTO.getUserName());

        // Log password before encoding to verify its value
        String rawPassword = authUserDTO.getPassword();
        System.out.println("Raw password before encoding: " + rawPassword);

        // Encode the password
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);

        authUsers.setPassword(encodedPassword); // Set the encoded password
        authUsers.setCreatedAt(LocalDateTime.now());

        // Save the user to the database
        return authUserRepository.save(authUsers);
    }

    public Optional<Auth_Users> getUserById(UUID id){
        return authUserRepository.findUserById(id);
    }

    public Optional<Auth_Users> getUserByUserName(String name) {
        return authUserRepository.findByUserName(name);
    }
}
