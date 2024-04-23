package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.ChatThread;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatThreadRepository extends CrudRepository<ChatThread,Long> {

}
