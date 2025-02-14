package com.example.user_management.user_management_service.Controller;


import com.example.user_management.user_management_service.DTO.UserManagmentDTO;
import com.example.user_management.user_management_service.Model.Users;
import com.example.user_management.user_management_service.Service.userManagmentService;
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
@RequestMapping("/api/user-management")
public class userManagementController {
    @Autowired
    private userManagmentService userManagementService;

    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "hello world");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create-user/{authId}")
    public ResponseEntity<Map<String, Object>> createUser(@PathVariable UUID authId, @RequestBody UserManagmentDTO userDTO) {


        System.out.println("Hello  ======= "+userDTO);
        Map<String, Object> response = new HashMap<>();

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

        Users user = userManagementService.addUser(userDTO, authId);

        response.put("First Name", user.getFirstName());
        response.put("Last Name", user.getLastName());
        response.put("Date of Birth", user.getDOB());
        response.put("College name", user.getCollegeName());
        response.put("Role", user.getRole());
        response.put("Phone Number", user.getPhoneNumber());
        response.put("profile-picture-url", user.getProfilePictureUrl());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-user/{userId}")
    public ResponseEntity<Optional<Users>> getUser(@PathVariable UUID userId){
        Optional<Users> user = userManagementService.getAllDataById(userId);

        if (user.isPresent()) {
            return ResponseEntity.ok(user);  // Return email if user exists
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

    @PostMapping("/update-user/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable UUID userId, @RequestBody UserManagmentDTO userDTO){
        return ResponseEntity.ok("hello");
    }
}
