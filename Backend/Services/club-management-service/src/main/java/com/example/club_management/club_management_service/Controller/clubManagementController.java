package com.example.club_management.club_management_service.Controller;


import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Services.clubManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class clubManagementController {

    @Autowired
    private clubManagementService clubService;



    @PostMapping("/clubs") // Create a new club
    public ResponseEntity <Map<String, Object>> createClub(ClubDTO clubDTO){
        ClubModel newClub = clubService.createClub(clubDTO);

        Map<String, Object> response = new HashMap<>();
        response.put("Name", newClub.getName());
        response.put("Description", newClub.getDescription());
        response.put("LogoUrl", newClub.getLogoUrl());
        response.put("BannerUrl", newClub.getBannerUrl());
        response.put("Category", newClub.getCategory());
        response.put("College name", newClub.getCollege());
        response.put("Visibility", newClub.getVisibility());
        response.put("FounderEmail", newClub.getFounderEmail());
        response.put("Club Email", newClub.getClubEmail());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/clubs") //Fetch all clubs
    public ResponseEntity<List<ClubModel>> getAllClubs(){
        List<ClubModel> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

//    @GetMapping("/club/:id") //Fetch a specific club by Id
//    public ResponseEntity<> getClubBYId(){
//
//    }
//
//    @PatchMapping("/clubs/:id") //Update club details
//
//    @DeleteMapping("/clubs/:id") //Delete a club
//
//    @PostMapping("clubs/:id/members") //Add a member to a club
//
//    @GetMapping("/clubs/:id/members") //Fetch members of a club
}
