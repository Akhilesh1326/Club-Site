package com.example.club_management.club_management_service.Controller;


import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.DTO.ClubMemberDTO;
import com.example.club_management.club_management_service.Model.ClubMemberModel;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Services.clubManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/club-management-service")
public class ClubManagementController {

    @Autowired
    private clubManagementService clubService;



    @PostMapping("/clubs/{userId}") // Create a new club
    public ResponseEntity <Map<String, Object>> createClub(@RequestParam UUID userId , @RequestBody ClubDTO clubDTO){
        ClubModel newClub = clubService.createClub(userId, clubDTO);

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

    @GetMapping("/club/clubId/{clubId}") //Fetch a specific club by Id
    public ResponseEntity<ClubModel> getClubByClubId(@RequestParam UUID clubId){
        return ResponseEntity.ok(clubService.getClubById(clubId));
    }

    @GetMapping("/club/userId/{userId}")
    public ResponseEntity<ClubModel> getCLubByUserId(@RequestParam UUID userId){
        return ResponseEntity.ok(clubService.getClubByUserId(userId));
    }
//
//    @PatchMapping("/clubs/:id") //Update club details
//
//    @DeleteMapping("/clubs/:id") //Delete a club
//
    @PostMapping("clubs/add-members/") //Add a member to a club
    public ResponseEntity<ClubMemberModel> addNewMemberToClub(@RequestBody ClubMemberDTO clubMemberDTO){
        return ResponseEntity.ok(clubService.addClubMembers(clubMemberDTO));
    }

//    @GetMapping("/clubs/:id/members") //Fetch members of a club
}
