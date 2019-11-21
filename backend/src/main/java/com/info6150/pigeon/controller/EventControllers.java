package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.Event;
import com.info6150.pigeon.service.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
public class EventControllers {

    @Autowired
    private EventServiceImpl eventService;

    // list all events
    @RequestMapping(value = "/event", method = RequestMethod.GET)
    public Collection<Event> getEventList() {
        return eventService.getEvents();
    }

    // list all events belongs to a certain user
    @RequestMapping(value = "/eventByUser/{userName}", method = RequestMethod.GET)
    public Collection<Event> getEventList(@PathVariable String userName) {
        return eventService.getEventsByUsername(userName);
    }

    // get the event by event id
    @RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
    public Event getEventById(@PathVariable String id, HttpServletResponse resp) {
        Event e = eventService.getEventById(id);
        return e;
    }

    // save event
    @RequestMapping(value = "/event", method = RequestMethod.POST)
    public void addEvent(@RequestBody Event e) {
        eventService.createEvent(e);
    }

    // delete event
    @RequestMapping(value = "/event/{id}", method = RequestMethod.DELETE)
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
}
