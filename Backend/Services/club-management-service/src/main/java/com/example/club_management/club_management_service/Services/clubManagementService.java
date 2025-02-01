package com.example.club_management.club_management_service.Services;


import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.FeignClient.clubServiceClient;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Repo.clubManagementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class clubManagementService {
    private final clubManagementRepo clubRepo;
    private final clubServiceClient clubClient;
    public clubManagementService(clubManagementRepo clubRepo, clubServiceClient clubClient) {
        this.clubRepo = clubRepo;
        this.clubClient = clubClient;
    }


    public ClubModel createClub(ClubDTO clubDTO){
        if(clubRepo.findByName(clubDTO.getName()).isPresent()){
            throw new RuntimeException("Name of club is already present");
        }

        ClubModel clubModel = new ClubModel();
        clubModel.setName(clubDTO.getName());
        clubModel.setDescription(clubDTO.getDescription());
        clubModel.setLogoUrl(clubDTO.getLogoUrl());
        clubModel.setBannerUrl(clubDTO.getBannerUrl());
        clubModel.setCategory(convertToCategory(clubDTO.getCategory()));
        clubModel.setCollege(clubDTO.getCollege());
        clubModel.setVisibility(convertToVisibility(clubDTO.getVisibility()));

        Map<String, Object> authResponse = clubClient.getAuthEmail(clubDTO.getFounderEmail());
        String founderEmail = (String) authResponse.get("auth-user");
        clubModel.setFounderEmail(founderEmail);
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

    public List<ClubModel> getAllClubs() {
        return clubRepo.findAll();
    }
}
