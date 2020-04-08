package com.info6150.pigeon.service;

import com.info6150.pigeon.model.Event;

import java.util.Collection;
import java.util.Optional;

public interface EventService {
     void createEvent(Event event);

     void updateEvent(String id, Event event);

     void deleteEvent(String id);

     Collection<Event> getEventsByUsername(String username);

     Optional<Event> getEventById(String id);

     Collection<Event> getEvents();
}
