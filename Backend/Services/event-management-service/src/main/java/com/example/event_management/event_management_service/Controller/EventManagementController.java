package com.example.event_management.event_management_service.Controller;



import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Service.EventManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/event-management")
public class EventManagementController {
    private final EventManagementService eventManagementService;
    public EventManagementController(EventManagementService eventManagementService){
        this.eventManagementService = eventManagementService;
    }

    @PostMapping("/create-event")
    public ResponseEntity<?> createEvent(@RequestBody EventManagementDTO eventManagementDTO){
        return ResponseEntity.ok(eventManagementService.createEvent(eventManagementDTO));
    }

}
