package com.info6150.pigeon.repository;

import com.info6150.pigeon.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    public List<Event> findByUsername(String userName);
}
