package com.example.user_management.user_management_service.Controller;


import com.example.user_management.user_management_service.DTO.UserManagmentDTO;
import com.example.user_management.user_management_service.Model.Users;
import com.example.user_management.user_management_service.Repo.UsersRepository;
import com.example.user_management.user_management_service.Service.userManagmentService;
import org.apache.catalina.User;
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
    @Autowired
    private UsersRepository usersRepository;

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

        response.put("status","Success");
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

    @PatchMapping("/update-user/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable UUID userId, @RequestBody UserManagmentDTO userDTO){
        Optional<Users> user = userManagementService.getAllDataById(userId);
        if(user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user Id not found");
        }

        Users existUser = user.get();
        if(existUser.getFirstName() != null){
            existUser.setFirstName(userDTO.getFirstName());
        }
        if(existUser.getLastName() != null){
            existUser.setLastName(userDTO.getLastName());
        }
        if(existUser.getDOB() != null){
        existUser.setDOB(userDTO.getDOB());
        }
        if(existUser.getCollegeName()!=null){
            existUser.setCollegeName(userDTO.getCollegeOrUniversityName());
        }
        if(existUser.getRole()!=null){
            existUser.setRole(convertToRole(userDTO.getRole()));
        }
        if(existUser.getPhoneNumber() != null){
            existUser.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if(existUser.getProfilePictureUrl() != null){
            existUser.setProfilePictureUrl(userDTO.getProfile_picture_url());
        }
        usersRepository.save(existUser);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Update Success");


    }
    private Users.Role convertToRole(String role){
        return Users.Role.valueOf(role);
    }

}
