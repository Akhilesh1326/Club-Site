package com.example.club_management.club_management_service.Controller;

import com.example.club_management.club_management_service.DTO.ClubDTO;
import com.example.club_management.club_management_service.DTO.ClubMemberDTO;
import com.example.club_management.club_management_service.Model.ClubMemberModel;
import com.example.club_management.club_management_service.Model.ClubModel;
import com.example.club_management.club_management_service.Repo.ClubManagementRepo;
import com.example.club_management.club_management_service.Services.clubManagementService;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/club-management-service")
public class ClubManagementController {

    private final clubManagementService clubService;
//    private final HttpMessageConverters messageConverters;
    private final ClubManagementRepo clubManagementRepo;

    public ClubManagementController(clubManagementService clubService, HttpMessageConverters messageConverters, ClubManagementRepo clubManagementRepo){
        this.clubService = clubService;
//        this.messageConverters = messageConverters;
        this.clubManagementRepo = clubManagementRepo;
    }


    @PostMapping("/clubs/{userId}") // Create a new club
    public ResponseEntity <Map<String, Object>> createClub(@PathVariable UUID userId , @RequestBody ClubDTO clubDTO){
        System.out.println("Club name"+clubDTO.getName());
        System.out.println("Club dec" +clubDTO.getDescription());
        System.out.println("Club cat"+clubDTO.getCategory());
        System.out.println("Club college "+clubDTO.getCollege());
        System.out.println("Club logo "+clubDTO.getLogoUrl());
        System.out.println("Club banner "+clubDTO.getBannerUrl());
        System.out.println("Club visible "+clubDTO.getVisibility());
        System.out.println("Club foundemail "+clubDTO.getFounderEmail());

        Map<String, Object> response = new HashMap<>();

        if(clubDTO.getName() == null || clubDTO.getName().trim().isEmpty()){
            response.put("error", "Club name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if(clubDTO.getDescription() == null || clubDTO.getDescription().trim().isEmpty()){
            response.put("error", "Club Description is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if(clubDTO.getCategory() == null || clubDTO.getCategory().trim().isEmpty()){
            response.put("error", "Club category is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if(clubDTO.getCollege() == null || clubDTO.getCollege().trim().isEmpty()){
            response.put("error", "Club's College name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        ClubModel newClub = clubService.createClub(userId, clubDTO);

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

    @GetMapping("/clubs/clubId/{clubId}") //Fetch a specific club by id
    public ResponseEntity<Optional<ClubModel>> getClubByClubId(@PathVariable UUID clubId){
        Optional<ClubModel> club = clubService.getClubById(clubId);
        if(club.isPresent()){
            return ResponseEntity.ok(club);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

    @GetMapping("/clubs/user/{userId}") // Fetch A club by userid
    public ResponseEntity<List<ClubModel>> getClubsByUserId(@PathVariable UUID userId) {
        List<ClubModel> clubs = clubService.getClubsByUserId(userId);

        if (clubs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/clubs/club-name/{name}") // get club by club id
    public ResponseEntity<Optional<ClubModel>> getClubByName(@PathVariable String name){
        Optional<ClubModel> club = clubService.getClubByName(name);
        if(club.isPresent()){
            return ResponseEntity.ok(club);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

//    @PatchMapping("/clubs/:id") //Update club details

    @DeleteMapping("/clubs") //Delete a club
    public ResponseEntity<String> deleteClub(@RequestBody UUID userId, UUID clubId){
        return ResponseEntity.ok(clubService.deleteClub(userId, clubId));
    }

    @PatchMapping("/clubs/update-club-details/{clubId}")
    public ResponseEntity<ClubModel> updateClubDetails(@RequestBody ClubDTO clubDTO, @PathVariable UUID clubId){
        Optional<ClubModel> existingClubOptional = clubManagementRepo.findClubById(clubId);
        if (existingClubOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ClubModel pathClub = clubService.pathClub(clubDTO, clubId);
        return ResponseEntity.ok(pathClub);
    }


//    ###### Member route controller ############################


    @PostMapping("clubs/add-members/") //Add a member to a club
    public ResponseEntity<Map<String, Object>> addNewMemberToClub(@RequestBody ClubMemberDTO clubMemberDTO){
        System.out.println("User id "+ clubMemberDTO.getUserId());
        System.out.println("Club id "+ clubMemberDTO.getClubId());
        System.out.println("Role "+ clubMemberDTO.getRole());
        System.out.println("Hierarchy "+ clubMemberDTO.getHierarchy());

        Map<String, Object> res = new HashMap<>();
        if(clubMemberDTO.getClubId() == null){
            res.put("Error ", "Club Id is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        if(clubMemberDTO.getUserId() == null){
            res.put("Error ", "User Id is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        if(clubMemberDTO.getRole() == null || clubMemberDTO.getRole().trim().isEmpty()){
            res.put("Error ", "Role is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        if(clubMemberDTO.getHierarchy() == null || clubMemberDTO.getHierarchy().trim().isEmpty()){
            res.put("Error ", "Hierarchy of role is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        ClubMemberModel newClubMember = clubService.addClubMembers(clubMemberDTO);
        res.put("Id ", newClubMember.getId());
        res.put("User Id",newClubMember.getUserId());
        res.put("Club Id",newClubMember.getClubId());
        res.put("Role", newClubMember.getRole());
        res.put("Hierarchy ", newClubMember.getHierarchy());

        return ResponseEntity.ok(res);

    }

    @GetMapping("/clubs/club-members/{clubId}") //Fetch members of a club
    public ResponseEntity<List<ClubMemberModel>> getClubMemberByClubId(@PathVariable UUID clubId){
        List<ClubMemberModel> members = clubService.getMemberByClubId(clubId);
        return ResponseEntity.ok(members);
    }

    @DeleteMapping("/clubs/club-member-delete")
    public ResponseEntity<Optional<ClubMemberModel>> deleteClubMember(@RequestBody UUID userId, UUID clubId){
        Optional<ClubMemberModel> deletedMember = clubService.deleteMember(userId, clubId);
        return ResponseEntity.ok(deletedMember);
    }


}
