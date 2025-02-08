package com.example.event_management.event_management_service.Controller;



import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Service.EventManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/eventManagement")
public class EventManagementController {
    private final EventManagementService eventManagementService;
    @Autowired
    private EventManagementModel eventManagementModel;

    public EventManagementController(EventManagementService eventManagementService){
        this.eventManagementService = eventManagementService;
    }

    @PostMapping("/create-event")
    public ResponseEntity<?> createEvent(@RequestBody EventManagementDTO eventManagementDTO){
        return ResponseEntity.ok(eventManagementService.createEvent(eventManagementDTO));
    }

    @GetMapping("event")
    public ResponseEntity<List<EventManagementModel>> getAllEvents(){
        List<EventManagementModel> events = eventManagementService.getAllEvents();
    }


    @GetMapping("/get-event-by-category/{category}")
    public List<EventManagementModel> getEventByCategory(@RequestParam String category){
        return ResponseEntity.ok(eventManagementService.getEventByCategory(category));
    }

}
