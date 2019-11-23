package com.info6150.pigeon.service;

import com.info6150.pigeon.model.Event;
import com.info6150.pigeon.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service("eventService")
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;

    @Autowired
    EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public void createEvent(Event event) {
        eventRepository.save(event);
    }

    public void updateEvent(String id, Event event) {
        deleteEvent(id);
        createEvent(event);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Collection<Event> getEventsByUsername(String username) {
        return eventRepository.findAllByUsername(username);
    }

    public Collection<Event> getEvents() {
        return eventRepository.findAll();
    }
}
