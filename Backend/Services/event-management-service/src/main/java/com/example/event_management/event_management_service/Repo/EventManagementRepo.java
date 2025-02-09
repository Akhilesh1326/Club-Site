package com.example.event_management.event_management_service.Repo;

import com.example.event_management.event_management_service.Model.EventManagementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventManagementRepo extends JpaRepository<EventManagementModel, UUID> {
    List<EventManagementModel> findByClubId(UUID clubId);

}
