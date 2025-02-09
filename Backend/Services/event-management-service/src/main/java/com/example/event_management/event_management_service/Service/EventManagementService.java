package com.example.event_management.event_management_service.Service;

import com.example.event_management.event_management_service.Controller.EventManagementController;
import com.example.event_management.event_management_service.DTO.EventManagementDTO;
import com.example.event_management.event_management_service.DTO.EventParticipantsDTO;
import com.example.event_management.event_management_service.Model.EventManagementModel;
import com.example.event_management.event_management_service.Model.EventParticipantsModel;
import com.example.event_management.event_management_service.Repo.EventManagementRepo;
import com.example.event_management.event_management_service.Repo.EventParticipantsRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventManagementService {
    private final EventManagementRepo eventManagementRepo;
    private final EventParticipantsRepo eventParticipantsRepo;

    public EventManagementService(EventManagementRepo eventManagementRepo, EventParticipantsRepo eventParticipantsRepo){
        this.eventManagementRepo = eventManagementRepo;
        this.eventParticipantsRepo = eventParticipantsRepo;
    }

    public EventManagementModel createEvent(EventManagementDTO eventManagementDTO){
        EventManagementModel eventManagementModel = new EventManagementModel();
        eventManagementModel.setTitle(eventManagementDTO.getTitle());
        eventManagementModel.setDescription(eventManagementDTO.getDescription());
        eventManagementModel.setCategory(convertToCategory(eventManagementDTO.getCategory()));
        eventManagementModel.setStartTime(eventManagementDTO.getStartTime());
        eventManagementModel.setEndTime(eventManagementDTO.getEndTime());
        eventManagementModel.setLocation(eventManagementDTO.getLocation());
        eventManagementModel.setOrganizerId(convertToUUID(eventManagementDTO.getOrganizerId()));
        eventManagementModel.setClubId(convertToUUID(eventManagementDTO.getClubId()));
        eventManagementModel.setRegistrationRequired(convertToBoolean(eventManagementDTO.getRegistrationRequired()));
        eventManagementModel.setMaxParticipants(convertToInteger(eventManagementDTO.getMaxParticipants()));

        return eventManagementRepo.save(eventManagementModel);
    }

    public List<EventManagementModel> getAllEvents(){
        return eventManagementRepo.findAll();
    }

    public 



    private EventManagementModel.Category convertToCategory(String category){
        try{
            return EventManagementModel.Category.valueOf(category);
        }catch (IllegalArgumentException e)
        {
            throw new RuntimeException("Invalid Category");
        }
    }
    private UUID convertToUUID(String id){
        return UUID.fromString(id);
    }
    private Boolean convertToBoolean(String data){
        return Boolean.parseBoolean(data);
    }
    private Integer convertToInteger(String val){
        return Integer.parseInt(val);
    }


    public List<EventManagementModel> getEventByCategory(String category) {
        return EventManagementRepo.findByCategory(category);
    }
}
