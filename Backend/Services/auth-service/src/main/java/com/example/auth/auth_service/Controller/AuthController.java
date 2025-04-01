package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.DTO.UserInfoDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth-service")
public class AuthController {

    @Autowired
    private AuthUserService authUserService;
    @Autowired
    private AuthUserRepository authUserRepository;


    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "hello world");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/id-login")
    public Map<String, String> getIdByUsername(@RequestBody Map<String, String> request) {
        String userName = request.get("userName");
        Optional<Auth_Users> userData = authUserService.getUserByUserName(userName);

        if (userData.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        String userId = userData.get().getUserId().toString();
        System.out.println("auth data = " + userId);

        Map<String, String> map = new HashMap<>();
        map.put("userId", userId);
        return map;
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthUserDTO authUserDTO, HttpServletResponse response) {
        // Verify user and get response (could be a token, userId, etc.)
        String authResponse = authUserService.verify(authUserDTO);

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
    public ResponseEntity<Map<String, Object>>  registerAuthUser(@RequestBody AuthUserDTO userDTO, HttpServletResponse response1) {
        System.out.println("Hello = " + userDTO);
        Map<String, Object> response = new HashMap<>();

        if(userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()){
            response.put("Error", "Email is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if(userDTO.getUserName() == null || userDTO.getUserName().trim().isEmpty()){
            response.put("Error", "Username is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if(userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()){
            response.put("Error", "Password is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        }

        if (userDTO.getFirstName() == null || userDTO.getFirstName().trim().isEmpty()) {
            response.put("error", "First name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userDTO.getLastName() == null || userDTO.getLastName().trim().isEmpty()) {
            response.put("error", "Last name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userDTO.getCollegeOrUniversityName() == null || userDTO.getCollegeOrUniversityName().trim().isEmpty()) {
            response.put("error", "College or University name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userDTO.getPhoneNumber() == null || userDTO.getPhoneNumber().trim().isEmpty()) {
            response.put("error", "Phone number is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (userDTO.getDOB() == null) {
            response.put("error", "Date of birth is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        authUserService.register(userDTO);
        String token = authUserService.verify(userDTO);



        Cookie cookie = new Cookie("authToken", token);

        // Set cookie properties
        cookie.setHttpOnly(true); // Secure, prevents JS access
        cookie.setSecure(true);   // Use HTTPS
        cookie.setPath("/");      // Available for the entire domain
        cookie.setMaxAge(24 * 60 * 60); // 1 day expiration time in seconds

        // Add the cookie to the response
        response1.addCookie(cookie);

        response.put("status", "Success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth-user/id/{id}")
    public ResponseEntity<String> getUserById(@PathVariable UUID id) {
        System.out.println("Hello from get");
        Optional<Auth_Users> user = authUserService.getUserById(id);
        System.out.println(user);
        if (user.isPresent()) {
            return ResponseEntity.ok("Username = "+user.get().getUserName() +
                    "\nEmail = "+user.get().getEmail());  // Return email if user exists
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/get-users/id/{id}")
    public List<UserInfoDTO> getUserInBulk(@RequestBody List<UUID> Members) {
        System.out.println("Hello from get");

        List<UserInfoDTO> users = authUserService.getUserDetailsByIds(Members);
        System.out.println(users);
        return users;

    }

    @GetMapping("/auth-user/name/{name}")
    public ResponseEntity<String> getUserByName(@PathVariable String name){
        Optional<Auth_Users> user = authUserService.getUserByUserName(name);
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

        Optional<Auth_Users> existUser = authUserService.getUserById(userId);
        if(existUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
        Auth_Users patchUser = authUserService.patchUser(authUserDTO, userId);
        return ResponseEntity.ok("Update Success");
    }

    @GetMapping("/get-user")
    public ResponseEntity<Optional<Auth_Users>> getUser(@RequestHeader("userId") String userId,
                                                        @RequestHeader("username") String username,
                                                        @RequestHeader("role") String role){

        System.out.println("username = "+username);
        System.out.println("username = "+userId);
        System.out.println("username = "+role);
        Optional<Auth_Users> user = authUserRepository.findUserById(UUID.fromString(userId));

        if (user.isPresent()) {
            System.out.println("hello1");
            return ResponseEntity.ok(user);  // Return email if user exists
        } else {
            System.out.println("hello1");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }



    @PatchMapping("/update-user/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable UUID userId, @RequestBody AuthUserDTO userDTO){
        Optional<Auth_Users> userOptional = null;
        if(userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user Id not found");
        }

        Auth_Users existingUser = userOptional.get();
        if(userDTO.getFirstName() != null){
            existingUser.setFirstName(userDTO.getFirstName());
        }
        if(userDTO.getLastName() != null){
            existingUser.setLastName(userDTO.getLastName());
        }
        if(userDTO.getDOB() != null){
            existingUser.setDOB(userDTO.getDOB());
        }
        if(userDTO.getCollegeOrUniversityName() != null){
            existingUser.setCollegeOrUniversityName(userDTO.getCollegeOrUniversityName());
        }
        if(userDTO.getRole() != null){
            existingUser.setRole(convertToRole(userDTO.getRole()));
        }
        if(userDTO.getPhoneNumber() != null){
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if(userDTO.getProfile_picture_url() != null){
            existingUser.setProfilePictureUrl(userDTO.getProfile_picture_url());
        }

        // This should be handled in the service
//        userManagementService.updateUser(existingUser);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Update Success");
    }

    private Auth_Users.Role convertToRole(String role){
        return Auth_Users.Role.valueOf(role);
    }
}