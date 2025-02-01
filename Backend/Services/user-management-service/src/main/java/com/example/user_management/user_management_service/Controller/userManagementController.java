package com.example.user_management.user_management_service.Controller;


import com.example.user_management.user_management_service.DTO.UserManagmentDTO;
import com.example.user_management.user_management_service.Model.Users;
import com.example.user_management.user_management_service.Service.userManagmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class userManagementController {
    @Autowired
    private userManagmentService userManagementService;

    @PostMapping("/user-managment")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserManagmentDTO userDTO) {
        Users user = userManagementService.addUser(userDTO);

        Map<String, Object> response = new HashMap<>();
        response.put("email", user.getName());
        response.put("auth-user", user.getAuthUser());
        response.put("profile-picture-url", user.getProfilePictureUrl());

        return ResponseEntity.ok(response);
    }
}
