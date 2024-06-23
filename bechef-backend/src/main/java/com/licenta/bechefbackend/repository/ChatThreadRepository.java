package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Recipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatThreadRepository extends CrudRepository<ChatThread,Long> {
    @Query("SELECT t FROM ChatThread t Where LOWER(t.topic) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<ChatThread> findByKeyword(String keyword);
}
