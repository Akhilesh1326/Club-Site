package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.AuthUserDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth-service")
public class AuthController {

    @Autowired
    private AuthUserService authUserService;

    @Autowired
    private AuthUserRepository authUserRepository;

    // Configure upload directory - can be overridden in application.properties
    @Value("${app.upload.dir:${user.home}/app-uploads/profile-pictures/}")
    private String uploadDirectory;

    @PostConstruct
    public void init() {
        try {
            Path uploadPath = Paths.get(uploadDirectory);
            Files.createDirectories(uploadPath);
            System.out.println("Upload directory created/verified: " + uploadDirectory);
        } catch (IOException e) {
            System.err.println("Could not create upload directory: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @GetMapping("/greet")
    public ResponseEntity<Map<String, String>> greet() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "hello world");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/id-login")
    public ResponseEntity<Map<String, String>> getIdByUsername(@RequestBody Map<String, String> request) {
        String userName = request.get("userName");

        if (userName == null || userName.trim().isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Username is required");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Optional<Auth_Users> userData = authUserService.getUserByUserName(userName);
        Map<String, String> map = new HashMap<>();

        if (userData.isEmpty()) {
            map.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }

        String userId = userData.get().getUserId().toString();
        System.out.println("auth data = " + userId);

        map.put("userId", userId);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthUserDTO authUserDTO, HttpServletResponse response) {
        Map<String, String> responseMap = new HashMap<>();

        try {
            System.out.println("got called to login ");
            String authResponse = authUserService.verify(authUserDTO);
            System.out.println("Auth Response: " + authResponse);

            Cookie cookie = new Cookie("authToken", authResponse);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60); // 1 day expiration time in seconds

            response.addCookie(cookie);

            responseMap.put("status", "Success");
            responseMap.put("message", "Login successful");
            return ResponseEntity.ok(responseMap);

        } catch (Exception e) {
            responseMap.put("status", "Error");
            responseMap.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerAuthUser(
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("DOB") String DOB,
            @RequestParam("collegeOrUniversityName") String collegeOrUniversityName,
            @RequestParam("role") String role,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "year", required = false) String year,
            @RequestParam(value = "profile_picture", required = false) MultipartFile profilePicture,
            HttpServletResponse response1) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Basic validation
            if (userName == null || userName.trim().isEmpty()) {
                response.put("error", "Username is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            if (email == null || email.trim().isEmpty()) {
                response.put("error", "Email is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            if (password == null || password.trim().isEmpty()) {
                response.put("error", "Password is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Check if user already exists
            if (authUserService.getUserByUserName(userName).isPresent()) {
                response.put("error", "Username already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Uncomment this if you want to check for email uniqueness
            // if (authUserService.getUserByEmail(email).isPresent()) {
            //     response.put("error", "Email already exists");
            //     return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            // }

            AuthUserDTO userDTO = new AuthUserDTO();
            userDTO.setUserName(userName);
            userDTO.setEmail(email);
            userDTO.setPassword(password);
            userDTO.setFirstName(firstName);
            userDTO.setLastName(lastName);

            // Convert string date to LocalDate
            if (DOB != null && !DOB.trim().isEmpty()) {
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                    LocalDate parsedDate = LocalDate.parse(DOB, formatter);
                    userDTO.setDOB(parsedDate);
                } catch (DateTimeParseException e) {
                    response.put("error", "Invalid date format. Please use DD-MM-YYYY format.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }

            userDTO.setCollegeOrUniversityName(collegeOrUniversityName);
            userDTO.setRole(role);
            userDTO.setPhoneNumber(phoneNumber);
            userDTO.setState(state);
            userDTO.setCity(city);
            userDTO.setDepartment(department);

            // Parse year safely
            if (year != null && !year.trim().isEmpty()) {
                try {
                    userDTO.setYear(Integer.parseInt(year));
                } catch (NumberFormatException e) {
                    response.put("error", "Invalid year format");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }

            // Handle file upload - FIXED VERSION
            if (profilePicture != null && !profilePicture.isEmpty()) {
                try {
                    String profilePictureUrl = saveProfilePicture(profilePicture);
                    userDTO.setProfilePictureUrl(profilePictureUrl);
                } catch (IOException e) {
                    System.err.println("File upload error: " + e.getMessage());
                    e.printStackTrace();
                    response.put("error", "Failed to save profile picture: " + e.getMessage());
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                } catch (IllegalArgumentException e) {
                    response.put("error", e.getMessage());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }

            // Save user to database (including the file path)
            authUserService.register(userDTO);
            String token = authUserService.verify(userDTO);

            Cookie cookie = new Cookie("authToken", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);
            response1.addCookie(cookie);

            response.put("status", "Success");
            response.put("message", "Registration successful");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // Add logging
            response.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // FIXED: Private method to handle file upload logic
    private String saveProfilePicture(MultipartFile profilePicture) throws IOException, IllegalArgumentException {
        // 1. Validate file type
        if (!isValidImageType(profilePicture.getContentType())) {
            throw new IllegalArgumentException("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
        }

        // 2. Validate file size (5MB limit)
        if (profilePicture.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File too large. Maximum size is 5MB.");
        }

        // 3. Generate unique filename
        String originalFilename = profilePicture.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new IllegalArgumentException("Invalid file name");
        }

        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        // 4. Ensure upload directory exists
        Path uploadPath = Paths.get(uploadDirectory);
        Files.createDirectories(uploadPath);

        // 5. Create full file path
        Path destinationPath = uploadPath.resolve(uniqueFilename);

        // 6. Save file using Files.copy (more reliable than transferTo)
        Files.copy(profilePicture.getInputStream(), destinationPath);

        System.out.println("File saved successfully at: " + destinationPath.toString());

        // 7. Return URL path for serving images
        return "/api/auth-service/images/" + uniqueFilename;
    }

    // FIXED: Updated image serving endpoint
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Security check - prevent directory traversal
            if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
                System.err.println("Security violation: Invalid filename " + filename);
                return ResponseEntity.badRequest().build();
            }

            // 1. Construct file path using the same upload directory
            Path filePath = Paths.get(uploadDirectory).resolve(filename);

            // 2. Create resource from file
            Resource resource = new UrlResource(filePath.toUri());

            // 3. Check if file exists and is readable
            if (resource.exists() && resource.isReadable()) {
                // 4. Determine content type
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                // 5. Return file with appropriate headers
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                System.err.println("File not found: " + filePath);
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            System.err.println("Error serving image: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private boolean isValidImageType(String contentType) {
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/gif") ||
                        contentType.equals("image/webp")
        );
    }

    @GetMapping("/auth-user/name/{name}")
    public ResponseEntity<Map<String, String>> getUserByName(@PathVariable String name) {
        Map<String, String> response = new HashMap<>();

        try {
            Optional<Auth_Users> user = authUserService.getUserByUserName(name);
            if (user.isPresent()) {
                response.put("userName", user.get().getUserName());
                response.put("email", user.get().getEmail());
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Error retrieving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/auth-user/user-update/{userId}")
    public ResponseEntity<Map<String, String>> patchUserInfo(@RequestBody AuthUserDTO authUserDTO, @PathVariable UUID userId) {
        Map<String, String> response = new HashMap<>();

        try {
            if (userId == null) {
                response.put("error", "userId is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            Optional<Auth_Users> existUser = authUserService.getUserById(userId);
            if (existUser.isEmpty()) {
                response.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Auth_Users patchUser = authUserService.patchUser(authUserDTO, userId);
            response.put("status", "Success");
            response.put("message", "User updated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("error", "Update failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/get-user")
    public ResponseEntity<Map<String, Object>> getUser(@RequestHeader("userId") String userId,
                                                       @RequestHeader("username") String username,
                                                       @RequestHeader("role") String role) {
        Map<String, Object> response = new HashMap<>();

        try {
            System.out.println("username = " + username);
            System.out.println("userId = " + userId);
            System.out.println("role = " + role);

            Optional<Auth_Users> user = authUserRepository.findUserById(UUID.fromString(userId));

            if (user.isPresent()) {
                response.put("user", user.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (IllegalArgumentException e) {
            response.put("error", "Invalid userId format");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("error", "Error retrieving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/update-user/{userId}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable UUID userId, @RequestBody AuthUserDTO userDTO) {
        Map<String, String> response = new HashMap<>();

        try {
            Optional<Auth_Users> userOptional = authUserService.getUserById(userId);

            if (userOptional.isEmpty()) {
                response.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Auth_Users existingUser = userOptional.get();

            // Update fields if provided
            if (userDTO.getFirstName() != null && !userDTO.getFirstName().trim().isEmpty()) {
                existingUser.setFirstName(userDTO.getFirstName());
            }
            if (userDTO.getLastName() != null && !userDTO.getLastName().trim().isEmpty()) {
                existingUser.setLastName(userDTO.getLastName());
            }
            if (userDTO.getDOB() != null) {
                existingUser.setDOB(userDTO.getDOB());
            }
            if (userDTO.getCollegeOrUniversityName() != null && !userDTO.getCollegeOrUniversityName().trim().isEmpty()) {
                existingUser.setCollegeOrUniversityName(userDTO.getCollegeOrUniversityName());
            }
            if (userDTO.getRole() != null && !userDTO.getRole().trim().isEmpty()) {
                existingUser.setRole(convertToRole(userDTO.getRole()));
            }
            if (userDTO.getPhoneNumber() != null && !userDTO.getPhoneNumber().trim().isEmpty()) {
                existingUser.setPhoneNumber(userDTO.getPhoneNumber());
            }
            if (userDTO.getProfile_picture_url() != null && !userDTO.getProfile_picture_url().trim().isEmpty()) {
                existingUser.setProfilePictureUrl(userDTO.getProfile_picture_url());
            }
            if (userDTO.getState() != null && !userDTO.getState().trim().isEmpty()) {
                existingUser.setState(userDTO.getState());
            }
            if (userDTO.getCity() != null && !userDTO.getCity().trim().isEmpty()) {
                existingUser.setCity(userDTO.getCity());
            }
            if (userDTO.getDepartment() != null && !userDTO.getDepartment().trim().isEmpty()) {
                existingUser.setDepartment(userDTO.getDepartment());
            }
            if (userDTO.getYear() != null) {
                existingUser.setYear(userDTO.getYear());
            }

            // Save using repository
            authUserRepository.save(existingUser);

            response.put("status", "Success");
            response.put("message", "User updated successfully");
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            response.put("error", "Invalid role or data format: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("error", "Update failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // NEW: Add endpoint to update profile picture separately
    @PostMapping("/update-profile-picture/{userId}")
    public ResponseEntity<Map<String, String>> updateProfilePicture(
            @PathVariable UUID userId,
            @RequestParam("profile_picture") MultipartFile profilePicture) {

        Map<String, String> response = new HashMap<>();

        try {
            Optional<Auth_Users> userOptional = authUserService.getUserById(userId);

            if (userOptional.isEmpty()) {
                response.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            if (profilePicture == null || profilePicture.isEmpty()) {
                response.put("error", "Profile picture is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Save new profile picture
            String profilePictureUrl = saveProfilePicture(profilePicture);

            // Update user with new profile picture URL
            Auth_Users existingUser = userOptional.get();
            existingUser.setProfilePictureUrl(profilePictureUrl);
            authUserRepository.save(existingUser);

            response.put("status", "Success");
            response.put("message", "Profile picture updated successfully");
            response.put("profilePictureUrl", profilePictureUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            System.err.println("File upload error: " + e.getMessage());
            e.printStackTrace();
            response.put("error", "Failed to save profile picture: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("error", "Update failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private Auth_Users.Role convertToRole(String role) {
        try {
            return Auth_Users.Role.valueOf(role.replace(" ", "_").toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}