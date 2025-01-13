package com.example.auth.auth_service.Repo;


import com.example.auth.auth_service.Model.Auth_Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface AuthUserRepository extends JpaRepository<Auth_Users, Long>{
    Optional<Auth_Users> findByEmail(String email);
}
