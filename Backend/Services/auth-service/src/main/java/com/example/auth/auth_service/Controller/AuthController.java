package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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
        response.put("userName ", registeredUser.getUserName());
        response.put("email", registeredUser.getEmail());
        response.put("password", registeredUser.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth-user/id/{id}")
    public ResponseEntity<String> getUserById(@PathVariable UUID id) {
        System.out.println("Hello from get");
        Optional<Auth_Users> user = authUserSerivce.getUserById(id);
        System.out.println(user);
        if (user.isPresent()) {
            return ResponseEntity.ok("Username = "+user.get().getUserName() +
                                            "\nEmail = "+user.get().getEmail());  // Return email if user exists
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/auth-user/name/{name}")
    public ResponseEntity<String> getUserByName(@PathVariable String name){
        Optional<Auth_Users> user = authUserSerivce.getUserByUserName(name);
        if(user.isPresent()){
            return ResponseEntity.ok("Username = "+user.get().getUserName() +
                    "\nEmail = "+user.get().getEmail());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");

        }
    }

    @PatchMapping("/auth-user/user-update/{userId}")
    public ResponseEntity<String> patchUserInfo(@RequestBody AuthUserDTO authUserDTO, @PathVariable UUID userId){

        if(userId == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("userId is required");
        }

        Optional<Auth_Users> existUser = authUserRepository.findUserById(userId);
        if(existUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
        Auth_Users patchUser = authUserSerivce.patchUser(authUserDTO, userId);
        return ResponseEntity.ok("Update Success");
    }

}
