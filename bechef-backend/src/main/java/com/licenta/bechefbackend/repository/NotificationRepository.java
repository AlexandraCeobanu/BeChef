package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends CrudRepository<Notification,Long> {
    @Query("SELECT n from Notification n where n.receiverUser.id = ?1")
    List<Notification> findAllByUserId(Long userId);

    @Query("SELECT COUNT(*) from Notification n where n.receiverUser.id = ?1 and n.isRead = false")
    Long findNumberOfUnreadNotifications(Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE Notification n " + "SET n.isRead = true WHERE n.isRead = false and n.receiverUser.id = ?1")
    int readAllNotifications(Long userId);

    @Transactional
    @Modifying
    @Query("Delete FROM Notification n where n.stockItem.id = ?1")
    int deleteAllByItem(Long itemId);

}
