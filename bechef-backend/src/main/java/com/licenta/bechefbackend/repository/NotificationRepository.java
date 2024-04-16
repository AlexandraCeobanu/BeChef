package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.Notification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends CrudRepository<Notification,Long> {
    @Query("SELECT n from Notification n where n.receiverUser.id = ?1")
    List<NotificationDTO> findAllByUserId(Long userId);

}
