package com.example.club_management.club_management_service.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.club_management.club_management_service.Model.ClubModel;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface clubManagementRepo extends JpaRepository<ClubModel, Long> {
    Optional<ClubModel> findByName(String name);
    ClubModel findClubByClubId(UUID id);
    ClubModel findClubByUserId(UUID userId);
}
