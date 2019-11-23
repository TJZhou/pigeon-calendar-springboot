package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.Event;
import com.info6150.pigeon.service.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(value = "/event")
public class EventControllers {

    @Autowired
    private EventServiceImpl eventService;

    @RequestMapping( method = RequestMethod.GET)
    public Collection<Event> getEventList() {
        return eventService.getEvents();
    }

    @RequestMapping(value = "/user/{username}", method = RequestMethod.GET)
    public Collection<Event> getEventListByUsername(@PathVariable String username) {
        return eventService.getEventsByUsername(username);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id);
    }

    @RequestMapping( method = RequestMethod.POST)
    public void addEvent(@RequestBody Event e) {
        eventService.createEvent(e);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
}
