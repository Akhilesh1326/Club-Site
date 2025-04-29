package com.example.event_management.event_management_service.Controller;



import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Service.EventManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/event-management")
public class EventManagementController {
    private final EventManagementService eventManagementService;
    @Autowired


    public EventManagementController(EventManagementService eventManagementService ){
        this.eventManagementService = eventManagementService;

    }

    @PostMapping("/create-event")
    public Map<String, Object> createEvent(@RequestHeader("userId") String userId, @RequestHeader("role") String role,  @RequestBody EventManagementDTO eventManagementDTO){
        System.out.println("role = "+role);
        System.out.println("called event"+eventManagementDTO.getCategory());
        Map<String, Object> res = new HashMap<>();
//        if(Objects.equals(role, "Club_President") || Objects.equals(role, "Event_Organizer") ){
//            res.put("Status", "Your role is not eligible for this operation");
//            return res;
//        }
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
        System.out.println("event is created");
        return res;
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventManagementModel>> getAllEvents(){
        List<EventManagementModel> events = eventManagementService.getAllEvents();
        return ResponseEntity.ok(events);
    }
//    @GetMapping("/events/{eventId}")
//    public ResponseEntity<List<EventManagementModel>> getEventById(@RequestParam String eventId){
//        List<EventManagementModel> events = eventManagementService.getEventById(UUID.fromString(eventId));
//        return ResponseEntity.ok(events);
//    }


//    @GetMapping("/get-event-by-category/{category}")
//    public List<EventManagementModel> getEventByCategory(@RequestParam String category){
//        return ResponseEntity.ok(eventManagementService.getEventByCategory(category));
//    }

    @GetMapping("/get-events-by-level")
    public List<Object> getEventsByEventType(@RequestParam String level){
        List<Object> globalEvent = eventManagementService.getGlobalEvents(level);
        List<Object> list = new ArrayList<>();
        if(globalEvent.isEmpty()){
            list.add("No Data Found");
        }
        return globalEvent;
    }

    @DeleteMapping("/delete-event")
    public String deleteEvent(@RequestHeader("role") String role, @RequestParam String eventId){
        if(!Objects.equals(role, "Club_President")){
            return "Your Role is not eligible to perform the operation";
        }
        return eventManagementService.deleteEventById(UUID.fromString(eventId));
    }


}
