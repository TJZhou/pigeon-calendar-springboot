package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.Event;
import com.info6150.pigeon.model.User;
import com.info6150.pigeon.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@Controller
public class EventControllers {

    @Autowired
    private EventRepository repo;

    // list all events
    @RequestMapping(value = "/event", method = RequestMethod.GET)
    public @ResponseBody List<Event> getEventList(){
        return repo.findAll();
    }

    // list all events belongs to a certain user
    @RequestMapping(value = "/event/{userName}", method = RequestMethod.GET)
    public @ResponseBody List<Event> getEventList(@PathVariable String userName){
        return repo.findByUsername(userName);
    }

    // get the event by event id
    @RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
    public @ResponseBody Event getEventById(@PathVariable String id, HttpServletResponse resp){
        Optional<Event> e = repo.findById(id);
        if(e.isPresent()) {
            resp.setStatus(200);
            return e.get();
        }
        else {
            resp.setStatus(400);
            return null;
        }
    }

    // save event
    @RequestMapping(value = "/event", method = RequestMethod.POST)
    public @ResponseBody void addEvent(@RequestBody Event e){
        repo.save(e);
    }

    // delete event
    @RequestMapping(value = "/event/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteEvent(@PathVariable String id){
        repo.deleteById(id);
    }
}
