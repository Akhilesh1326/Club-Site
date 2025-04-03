package com.example.auth.auth_service.Service;


import com.example.auth.auth_service.CustomException.EmailAlreadyExistsException;
import com.example.auth.auth_service.CustomException.UserNameAlreadyExistsException;
import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.DTO.UserInfoDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;



@Service
public class AuthUserService {
    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JWTService jwtService;

    public void register(AuthUserDTO authUserDTO) {

        if (authUserRepository.findByEmail(authUserDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if(authUserRepository.findByUserName(authUserDTO.getUserName()).isPresent()) {
            throw new UserNameAlreadyExistsException("Username already exists");
        }


        Auth_Users users = new Auth_Users();
        users.setEmail(authUserDTO.getEmail());
        users.setUserName(authUserDTO.getUserName());

        // Log password before encoding to verify its value
        String rawPassword = authUserDTO.getPassword();
        System.out.println("Raw password before encoding: " + rawPassword);

        // Encode the password
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);

        users.setPassword(encodedPassword); // Set the encoded password
        users.setCreatedAt(LocalDateTime.now());

        users.setFirstName(authUserDTO.getFirstName());
        users.setLastName(authUserDTO.getLastName());
        users.setDOB(authUserDTO.getDOB());
        users.setRole(convertToRole(authUserDTO.getRole()));
        users.setCollegeOrUniversityName(authUserDTO.getCollegeOrUniversityName());
        users.setPhoneNumber(authUserDTO.getPhoneNumber());
        users.setProfilePictureUrl(authUserDTO.getProfile_picture_url());
        users.setCity(authUserDTO.getCity());
        users.setState(authUserDTO.getState());
        users.setDepartment(authUserDTO.getDepartment());
        users.setYear(authUserDTO.getYear());

        authUserRepository.save(users);
    }

    public Optional<Auth_Users> getUserById(UUID id){
        return authUserRepository.findUserById(id);
    }
    public List<UserInfoDTO> getUserDetailsByIds(List<UUID> memberIds) {
        return authUserRepository.findUserDetailsByIds(memberIds);
    }

    public Optional<Auth_Users> getUserByUserName(String name) {
        return authUserRepository.findByUserName(name);
    }

    public Auth_Users patchUser(AuthUserDTO authUserDTO, UUID userId) {
        Optional<Auth_Users> getUser = authUserRepository.findUserById(userId);
        Auth_Users patchUser = getUser.get();

        if(authUserDTO.getUserName() != null){
            patchUser.setUserName(authUserDTO.getUserName());
        }

        if(authUserDTO.getEmail() != null){
            patchUser.setEmail(authUserDTO.getEmail());
        }

        if(authUserDTO.getPassword() != null){
            String encodedPassword = passwordEncoder.encode(authUserDTO.getPassword());
            patchUser.setPassword(encodedPassword);
        }
        return authUserRepository.save(patchUser);

    }

    public String verify(AuthUserDTO authUserDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authUserDTO.getUserName(), authUserDTO.getPassword()));
        if (authentication.isAuthenticated()) {
            Auth_Users userData = authUserRepository.getByUserName(authUserDTO.getUserName());
            System.out.println("auth data = "+userData.getUserId());
            System.out.println("auth role = "+userData.getRole());
            return jwtService.generateToken(authUserDTO.getUserName(), userData.getUserId(), userData.getRole());
        } else {
            return "fail";
        }
    }




    private Auth_Users.Role convertToRole(String role) {
        try {
            return Auth_Users.Role.valueOf(role);
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }


}
