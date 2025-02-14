package com.example.user_management.user_management_service.Repo;

import com.example.user_management.user_management_service.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID> {
//    Optional<Users> findByName(String name); // Custom query to find a user by name

    Optional<Users> findUsersById(UUID id);
}
