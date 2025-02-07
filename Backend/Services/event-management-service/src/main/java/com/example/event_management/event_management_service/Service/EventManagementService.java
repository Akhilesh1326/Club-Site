package com.example.event_management.event_management_service.Service;

import com.example.event_management.event_management_service.Controller.EventManagementController;
import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.DTO.EventParticipantsDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Model.EventParticipantsModel;
import com.example.event_management.event_management_service.Repo.EventManagementRepo;
import com.example.event_management.event_management_service.Repo.EventParticipantsRepo;
import org.springframework.stereotype.Service;

@Service
public class EventManagementService {
    private final EventManagementRepo eventManagementRepo;
    private final EventParticipantsRepo eventParticipantsRepo;

    public EventManagementService(EventManagementRepo eventManagementRepo, EventParticipantsRepo eventParticipantsRepo){
        this.eventManagementRepo = eventManagementRepo;
        this.eventParticipantsRepo = eventParticipantsRepo;
    }

    public EventManagementModel createEvent(EventManagementDTO eventManagementDTO){


        return EventManagementRepo.save();
    }



}
