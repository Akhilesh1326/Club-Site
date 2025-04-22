package com.example.club_management.club_management_service.Services;


import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.DTO.ClubMemberDTO;
import com.example.club_management.club_management_service.Model.ClubMemberModel;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Repo.ClubManagementRepo;
import com.example.club_management.club_management_service.Repo.ClubMemberRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class clubManagementService {
    private final ClubManagementRepo clubRepo;
//    private final clubServiceClient clubClient;
    private final ClubMemberRepo clubMemberRepo;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public clubManagementService(ClubManagementRepo clubRepo, ClubMemberRepo clubMemberRepo) {
        this.clubRepo = clubRepo;
        this.clubMemberRepo = clubMemberRepo;
    }

    public ClubModel createClub(UUID userId, ClubDTO clubDTO){
        System.out.println("hello");
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
        clubModel.setClubState(clubDTO.getClubState());
        clubModel.setClubCity(clubDTO.getClubCity());

        System.out.println("club city = "+ clubModel.getClubCity());
        System.out.println("club city = "+ clubDTO.getClubCity());

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

    public ClubMemberModel  addClubMembers(ClubMemberDTO clubMemberDTO){

        ClubMemberModel clubMemberModel = new ClubMemberModel();
        clubMemberModel.setUserId(clubMemberDTO.getUserId());
        clubMemberModel.setClubId(clubMemberDTO.getClubId());
        clubMemberModel.setRole(convertToRole(clubMemberDTO.getRole()));
        clubMemberModel.setHierarchy(getHierarchyByRole(clubMemberDTO.getRole()));
//      Hierarchy enum is removed and now it's purely based on what role is coming and switch statement so it can be more
//      for use to automatically get hierarchy

        return clubMemberRepo.save(clubMemberModel);

    }

    private String getHierarchyByRole(String role){
        switch (role){
            case "President", "VicePresident", "Secretary", "Treasurer" -> {
                return "Core_Positions";
            }

            case "Event_Coordinator", "Public_Relations_Officer", "Marketing_Head", "Sponsorship_Coordinator"->{
                return "Management_Event_Specific_Roles";
            }

            case "Technical_Lead", "Content_Writer", "Design_Head", "Webmaster" ->{
                return "Technical_Creative_Roles";
            }

            case "Membership_Coordinator", "Community_Manager", "Volunteer_Coordinator"->{
                return "Membership_Outreach_Roles";
            }

            case "Research_Head", "Sports_Coordinator", "Cultural_Head"->{
                return "Specialized_Roles";
            }

            default ->{
                throw new IllegalArgumentException("Unknown role type"+ role);
            }
        }

    }

    public  ClubMemberModel.Role convertToRole(String role){
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

// Internal communication service
 // Make sure to define this as a bean in your config.

    public Map<String, Object> getClubMemberByClubId(UUID clubId) {
        System.out.println("hello 1");
        List<ClubMemberModel> members = clubMemberRepo.findByClubId(clubId);
        System.out.println("hello 2");

        List<UUID> memberIds = members.stream()
                .map(ClubMemberModel::getUserId)
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        System.out.println("all members for this call  = " + memberIds);
        for(UUID id : memberIds){
            System.out.println("member id = " + id); // Fixed to print individual id
        }
        System.out.println("hello 3");

        map.put("MemberId", memberIds);

        // Direct API call without service discovery
        List<Object> memberDetails = webClientBuilder.build()
                .post()
                .uri("http://localhost:8000/api/internal-auth-service/get-users") // Direct URL
                .bodyValue(memberIds)
                .retrieve()
                .bodyToFlux(Object.class)
                .collectList()
                .block();

        map.put("MemberDetails", memberDetails);

        return map;
    }


    private String extractJwtToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " to get the actual token
        }
        throw new RuntimeException("JWT Token is missing or invalid!");
    }


    public Optional<ClubMemberModel> deleteMember(UUID userId, UUID clubId) {
        return clubMemberRepo.deleteByUserIdAndClubId(userId, clubId);
    }

    public ClubModel patchClub(ClubDTO clubDTO, UUID clubId) {
        Optional<ClubModel> getClub =  clubRepo.findClubById(clubId);

        ClubModel existClub = getClub.get();

        if(clubDTO.getName() != null){
            existClub.setName(clubDTO.getName());
        }

       if(clubDTO.getDescription() != null){
            existClub.setDescription(clubDTO.getDescription());
        }

       if(clubDTO.getLogoUrl() != null){
            existClub.setLogoUrl(clubDTO.getLogoUrl());
        }
       if(clubDTO.getBannerUrl() != null){
            existClub.setBannerUrl(clubDTO.getBannerUrl());
        }
       if(clubDTO.getCategory() != null){
            existClub.setCategory(convertToCategory(clubDTO.getCategory()));
        }
       if(clubDTO.getCollege() != null){
            existClub.setCollege(clubDTO.getCollege());
        }
       if(clubDTO.getVisibility() != null){
            existClub.setVisibility(convertToVisibility(clubDTO.getVisibility()));
        }
       if(clubDTO.getFounderEmail() != null){
            existClub.setFounderEmail(clubDTO.getFounderEmail());
        }
       if(clubDTO.getClubEmail() != null){
            existClub.setClubEmail(clubDTO.getClubEmail());
        }
        return clubRepo.save(existClub);

    }

}
