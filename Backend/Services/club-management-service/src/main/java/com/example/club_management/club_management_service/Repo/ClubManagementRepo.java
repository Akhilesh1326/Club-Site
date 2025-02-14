package com.example.club_management.club_management_service.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.club_management.club_management_service.Model.ClubModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClubManagementRepo extends JpaRepository<ClubModel, String> {
    Optional<ClubModel> findByClubName(String name);
    Optional<ClubModel> findClubById(UUID id);
    List<ClubModel> findClubByUserId(UUID userId);


    void deleteByIdAndUserId(UUID clubId, UUID userId);
}
