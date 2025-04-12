package com.example.event_management.event_management_service.Controller;



import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Service.EventManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/eventManagement")
public class EventManagementController {
    private final EventManagementService eventManagementService;
    @Autowired


    public EventManagementController(EventManagementService eventManagementService ){
        this.eventManagementService = eventManagementService;

    }

    @PostMapping("/create-event")
    public Map<String, Object> createEvent(@RequestHeader("userId") String userId,  @RequestBody EventManagementDTO eventManagementDTO){
        System.out.println("event name = "+eventManagementDTO);
        Map<String, Object> res = new HashMap<>();
        if(eventManagementDTO.getTitle() == null || eventManagementDTO.getTitle().trim().isEmpty()){
            res.put("Status", "No Title of event is given");
            return res;
        }
        if(eventManagementDTO.getCategory() == null || eventManagementDTO.getCategory().trim().isEmpty()){
            res.put("Status", "No category is given to event");
            return res;
        }
        if(eventManagementDTO.getDescription() == null || eventManagementDTO.getDescription().trim().isEmpty()){
            res.put("Status", "No description is given to event");
            return res;
        }
        if(eventManagementDTO.getLocation() == null || eventManagementDTO.getLocation().trim().isEmpty()){
            res.put("Status", "No Location of event is given");
            return res;
        }
        if(eventManagementDTO.getStartTime() == null){
            res.put("Status", "No start time is given");
            return res;
        }
        if(eventManagementDTO.getEndTime() == null){
            res.put("Status", "No end time is given");
            return res;
        }
        if(eventManagementDTO.getMaxParticipants() == null){
            res.put("Status", "No event max participant list is given");
            return res;
        }
        if(eventManagementDTO.getRegistrationRequired() == null){
            res.put("Status", "Registration is Information is required");
            return res;
        }
        if(eventManagementDTO.getEventType() == null){
            res.put("Status", "Event type must be given, College_Level or Global_Level");
            return res;
        }
        EventManagementModel newEvent = eventManagementService.createEvent(UUID.fromString(userId), eventManagementDTO);
        res.put("Status", "Success");
        return res;
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventManagementModel>> getAllEvents(){
        List<EventManagementModel> events = eventManagementService.getAllEvents();
        return ResponseEntity.ok(events);
    }


//    @GetMapping("/get-event-by-category/{category}")
//    public List<EventManagementModel> getEventByCategory(@RequestParam String category){
//        return ResponseEntity.ok(eventManagementService.getEventByCategory(category));
//    }

}
