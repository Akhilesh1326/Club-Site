package com.example.user_management.user_management_service.Service;

import com.example.user_management.user_management_service.DTO.UserManagmentDTO;
import com.example.user_management.user_management_service.Model.Users;
import com.example.user_management.user_management_service.Repo.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class userManagmentService {
    private final UsersRepository usersRepository;


    // Constructor Injection
    public userManagmentService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users addUser(UserManagmentDTO userDTO, UUID authId) {
        // Create a new user
        Users users = new Users();

        users.setId(authId);
        users.setFirstName(userDTO.getFirstName());
        users.setLastName(userDTO.getLastName());
        users.setDOB(userDTO.getDOB());
        users.setRole(convertToRole(userDTO.getRole()));
        users.setCollegeName(users.getCollegeName());
        users.setPhoneNumber(users.getPhoneNumber());
        users.setProfilePictureUrl(userDTO.getProfile_picture_url());

        // Save the user
        return usersRepository.save(users);
    }

    private Users.Role convertToRole(String role) {
        try {
            return Users.Role.valueOf(role);
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Invalid role" + role);
        }
    }

    public Users getAllDataById(UUID userId){
        return usersRepository.getByUserId(userId);
    }
}
