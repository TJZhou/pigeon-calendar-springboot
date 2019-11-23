package com.info6150.pigeon.repository;

import com.info6150.pigeon.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findAllByUsername(String username);
}