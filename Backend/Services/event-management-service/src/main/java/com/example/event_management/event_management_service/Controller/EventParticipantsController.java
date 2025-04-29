package com.example.event_management.event_management_service.Controller;


import com.example.event_management.event_management_service.DTO.EventParticipantsDTO;

import com.example.event_management.event_management_service.Service.EventParticipantService;
import com.example.event_management.event_management_service.Service.EventAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/eventParticipant")
public class EventParticipantsController {

    private final EventParticipantService eventParticipantService;
    private final EventAttendanceService eventAttendanceService;
    @Autowired
    public EventParticipantsController(EventParticipantService eventParticipantService, EventAttendanceService eventAttendanceService){
        this.eventParticipantService = eventParticipantService;
        this.eventAttendanceService = eventAttendanceService;
    }


    @GetMapping("/greet")
    public String greet(){
        return "hello world";
    }

    @PostMapping("/add-participant")
    public Map<String, String> addParticipant(@RequestHeader("userId") String userId, @RequestBody EventParticipantsDTO eventParticipantsDTO){
        Map<String, String> res = new HashMap<>();
        if(eventParticipantsDTO.getEventId() == null){
            res.put("status", "Event Id Not Found");
            return res;
        }
        if(eventParticipantsDTO.getClubId() == null){
            res.put("status","Club Id Not Found");
            return res;
        }

        String isParticipated = eventParticipantService.addNewParticipants(UUID.fromString(userId), eventParticipantsDTO);
        res.put("status", isParticipated);
        return res;
    }
    @DeleteMapping("/delete-participant")
    public Map<String, String> deleteParticipant(@RequestHeader("role") String role, @RequestParam String userId){
        Map<String, String> res = new HashMap<>();

        if(!Objects.equals(role, "Club_President") || !Objects.equals(role,"Event_Organizer")){
            res.put("status","Your Role is not eligible to perform the operation");
            return res;
        }

        String info = eventParticipantService.deleteParticipant(UUID.fromString(userId));
        res.put("status", info);
        return res;
    }


    @PostMapping("/check-in")
    public Map<String, String> checkIn(
            @RequestHeader("userId") String userId,
            @RequestParam String eventId,
            @RequestParam(defaultValue = "Manual") String method) {

        Map<String, String> res = new HashMap<>();
        String status = eventAttendanceService.checkIn(UUID.fromString(eventId), UUID.fromString(userId), method);
        res.put("status", status);
        return res;
    }
}
