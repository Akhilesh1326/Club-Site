package com.example.auth.auth_service.Repo;


import com.example.auth.auth_service.DTO.UserInfoDTO;
import com.example.auth.auth_service.Model.Auth_Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuthUserRepository extends JpaRepository<Auth_Users, UUID>{

    Optional<Auth_Users> findByEmail(String email);
    Optional<Auth_Users> findByUserName(String  userName);
    Auth_Users getByUserName(String userName);
    Optional<Auth_Users> findUserById(UUID id);
    Optional<Auth_Users> findUsersById(UUID id);

    @Query("SELECT new com.example.auth.auth_service.DTO.UserInfoDTO(" +
            "u.id, u.firstName, u.lastName, u.role, u.profilePictureUrl) " +
            "FROM Auth_Users u WHERE u.id IN :memberIds")
    List<UserInfoDTO> findUserDetailsByIds(@Param("memberIds") List<UUID> memberIds);



}
