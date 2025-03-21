package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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




    @PostMapping("/login")
    public String login(@RequestBody AuthUserDTO authUserDTO, HttpServletResponse response) {
        // Verify user and get response (could be a token, userId, etc.)
        String authResponse = authUserSerivce.verify(authUserDTO);

        // Create a cookie with the auth response or token
        Cookie cookie = new Cookie("authToken", authResponse);

        // Set cookie properties
        cookie.setHttpOnly(true); // Secure, prevents JS access
        cookie.setSecure(true);   // Use HTTPS
        cookie.setPath("/");      // Available for the entire domain
        cookie.setMaxAge(24 * 60 * 60); // 1 day expiration time in seconds

        // Add the cookie to the response
        response.addCookie(cookie);

        return "status: Success";
    }


    @PostMapping("/register")
    public Map<String, String> registerAuthUser(@RequestBody AuthUserDTO authUserDTO, HttpServletResponse response1) {

        Auth_Users registeredUser = authUserSerivce.register(authUserDTO);

        String token = authUserSerivce.verify(authUserDTO);

        String id = registeredUser.getUserId().toString();

        Cookie cookie = new Cookie("authToken", token);

        // Set cookie properties
        cookie.setHttpOnly(true); // Secure, prevents JS access
        cookie.setSecure(true);   // Use HTTPS
        cookie.setPath("/");      // Available for the entire domain
        cookie.setMaxAge(24 * 60 * 60); // 1 day expiration time in seconds

        // Add the cookie to the response
        response1.addCookie(cookie);
        Map<String,String> map = new HashMap<>();
        map.put("Status", "Success");
        map.put("id", id);
        return map;
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
