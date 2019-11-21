package com.info6150.pigeon.service;

import com.info6150.pigeon.model.Event;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;

@Service("eventService")
public class EventServiceImpl implements EventService {
    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public void createEvent(Event event) {
        mongoTemplate.insert(event);
    }

    @Override
    public void updateEvent(String id, Event event) {
        deleteEvent(id);
        createEvent(event);
    }

    @Override
    public void deleteEvent(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        mongoTemplate.remove(query, Event.class);
    }

    @Override
    public Event getEventById(String id) {
        return mongoTemplate.findById(id, Event.class);
    }

    @Override
    public Collection<Event> getEventsByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return mongoTemplate.find(query, Event.class);
    }

    @Override
    public Collection<Event> getEvents() {
        return mongoTemplate.findAll(Event.class);
    }
}
