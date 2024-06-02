package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends CrudRepository<Collection,Long> {
    @Query("SELECT c FROM Collection c where c.user.id = ?1")
    List<Collection> findAllByUserId(Long userId);
}
