package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Like;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends CrudRepository<Like,Long> {

}
