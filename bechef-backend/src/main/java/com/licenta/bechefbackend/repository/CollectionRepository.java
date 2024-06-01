package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends CrudRepository<Collection,Long> {
}
