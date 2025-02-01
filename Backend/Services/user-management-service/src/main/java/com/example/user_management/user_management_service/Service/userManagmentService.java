package com.example.user_management.user_management_service.Service;

import com.example.user_management.user_management_service.DTO.UserManagmentDTO;
import com.example.user_management.user_management_service.FeignClient.AuthServiceClient;
import com.example.user_management.user_management_service.Model.Users;
import com.example.user_management.user_management_service.Repo.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class userManagmentService {
    private final UsersRepository usersRepository;
    private final AuthServiceClient authServiceClient;

    // Constructor Injection
    public userManagmentService(UsersRepository usersRepository, AuthServiceClient authServiceClient) {
        this.usersRepository = usersRepository;
        this.authServiceClient = authServiceClient;
    }

    public Users addUser(UserManagmentDTO userDTO) {
        // Create a new user
        Users users = new Users();
        users.setName(userDTO.getName());

        // Fetch auth-user ID from AuthService
        Map<String, Object> authResponse = authServiceClient.getAuthUser(userDTO.getAuth_user());

        // Assuming the response contains an "auth-user" field with the ID
        Long authUserId = (Long) authResponse.get("auth-user");
        users.setAuthUser(authUserId);

        // Set profile picture URL
        users.setProfilePictureUrl(userDTO.getProfile_picture_url());

        // Save the user
        return usersRepository.save(users);
    }
}
