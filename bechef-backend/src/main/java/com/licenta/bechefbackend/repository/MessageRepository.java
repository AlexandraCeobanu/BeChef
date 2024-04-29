package com.licenta.bechefbackend.repository;
import com.licenta.bechefbackend.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message,Long> {
}
