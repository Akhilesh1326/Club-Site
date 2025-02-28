package com.example.auth.auth_service.Repo;


import com.example.auth.auth_service.Model.Auth_Users;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<Auth_Users, UUID>{
    Optional<Auth_Users> findByEmail(String email);
    Optional<Auth_Users> findByUserName(String  userName);
    Auth_Users getByUserName(String userName);
    Optional<Auth_Users> findUserById(UUID id);
}
