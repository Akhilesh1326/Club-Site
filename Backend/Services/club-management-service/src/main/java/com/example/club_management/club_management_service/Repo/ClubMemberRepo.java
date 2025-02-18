package com.example.club_management.club_management_service.Repo;

import com.example.club_management.club_management_service.Model.ClubMemberModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClubMemberRepo extends MongoRepository<ClubMemberModel, String> {

    // Find members by clubId
    List<ClubMemberModel> findByClubId(UUID clubId);

    // Find members by userId
    Optional<ClubMemberModel> findByUserId(UUID userId);

    // Find members by role
    List<ClubMemberModel> findByRole(ClubMemberModel.Role role);

    // Find members by hierarchy
    List<ClubMemberModel> findByHierarchy(ClubMemberModel.Hierarchy hierarchy);

    // Find member by userId and clubId
    Optional<ClubMemberModel> findByUserIdAndClubId(UUID userId, UUID clubId);

    // Check if a member exists in a club
    boolean existsByUserIdAndClubId(UUID userId, UUID clubId);

    // Delete member by userId and clubId
    Optional<ClubMemberModel> deleteByUserIdAndClubId(UUID userId, UUID clubId);

}