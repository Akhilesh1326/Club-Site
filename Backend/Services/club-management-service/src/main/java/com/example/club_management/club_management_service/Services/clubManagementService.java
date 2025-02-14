package com.example.club_management.club_management_service.Services;


import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.DTO.ClubMemberDTO;
//import com.example.club_management.club_management_service.FeignClient.clubServiceClient;
import com.example.club_management.club_management_service.Model.ClubMemberModel;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Repo.ClubManagementRepo;
import com.example.club_management.club_management_service.Repo.ClubMemberRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
public class clubManagementService {
    private final ClubManagementRepo clubRepo;
//    private final clubServiceClient clubClient;
    private final ClubMemberRepo clubMemberRepo;

    public clubManagementService(ClubManagementRepo clubRepo, ClubMemberRepo clubMemberRepo) {
        this.clubRepo = clubRepo;
        this.clubMemberRepo = clubMemberRepo;
    }

    public ClubModel createClub(UUID userId, ClubDTO clubDTO){
        if(clubRepo.findByClubName(clubDTO.getName()).isPresent()){
            throw new RuntimeException("Name of club is already present");
        }


        ClubModel clubModel = new ClubModel();

        clubModel.setUserId(userId);

        clubModel.setName(clubDTO.getName());
        clubModel.setDescription(clubDTO.getDescription());
        clubModel.setLogoUrl(clubDTO.getLogoUrl());
        clubModel.setBannerUrl(clubDTO.getBannerUrl());
        clubModel.setCategory(convertToCategory(clubDTO.getCategory()));
        clubModel.setCollege(clubDTO.getCollege());
        clubModel.setVisibility(convertToVisibility(clubDTO.getVisibility()));
        clubModel.setFounderEmail(clubDTO.getFounderEmail());
        clubModel.setClubEmail(clubDTO.getClubEmail());

        return clubRepo.save(clubModel);
    }

    private ClubModel.Category convertToCategory(String category){
        try {
            return ClubModel.Category.valueOf(category);
        }catch (IllegalArgumentException e){
            throw new RuntimeException("Invalid category: "+ category);
        }
    }

    private ClubModel.Visibility convertToVisibility(String visibility){
        try {
            return ClubModel.Visibility.valueOf(visibility);
        }catch (IllegalArgumentException e){
            throw new RuntimeException("Invalid visibility option: "+visibility);
        }
    }
    public String deleteClub(UUID userId, UUID clubId) {
        clubRepo.deleteByIdAndUserId(clubId, userId);
        return "Deleted Successfully";
    }

    public List<ClubModel> getAllClubs() {
        return clubRepo.findAll();
    }

    public Optional<ClubModel> getClubById(UUID clubId){
        return clubRepo.findClubById(clubId);
    }

    public List<ClubModel> getClubsByUserId(UUID userId) {
        return clubRepo.findClubByUserId(userId);
    }

    public Optional<ClubModel> getClubByName(String name){
        return clubRepo.findByClubName(name);
    }

    public ClubMemberModel addClubMembers(ClubMemberDTO clubMemberDTO){


        ClubMemberModel clubMemberModel = new ClubMemberModel();
        clubMemberModel.setUserId(clubMemberDTO.getUserId());
        clubMemberModel.setClubId(clubMemberDTO.getClubId());
        clubMemberModel.setRole(convertToRole(clubMemberDTO.getRole()));
        clubMemberModel.setHierarchy(convertToHierarchy(clubMemberDTO.getHierarchy()));

        return clubMemberRepo.save(clubMemberModel);

    }

    private ClubMemberModel.Role convertToRole(String role){
        try{
            return ClubMemberModel.Role.valueOf(role);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Role option = "+role);
        }
    }

    private ClubMemberModel.Hierarchy convertToHierarchy(String hierarchy){
        try{
            return ClubMemberModel.Hierarchy.valueOf(hierarchy);
        }catch (IllegalArgumentException e){
            throw new RuntimeException("Invalid Hierarchy position ");
        }
    }


}
