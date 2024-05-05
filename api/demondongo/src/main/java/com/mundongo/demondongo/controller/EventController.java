package com.mundongo.demondongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mundongo.demondongo.model.Comment;
import com.mundongo.demondongo.model.Event;
import com.mundongo.demondongo.dto.EventDTO;

import com.mundongo.demondongo.service.EventService;

import java.util.List;

@RestController
@RequestMapping("api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<Event>> read() {
        return eventService.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> find(@PathVariable Long id) {
        return eventService.find(id);
    }

    @GetMapping("/nocomments")
    public ResponseEntity<List<EventDTO>> readWithoutComments() {
        return eventService.readWithoutComments();
    }

    @GetMapping("/nocomments/{searchName}")
    public ResponseEntity<List<EventDTO>> findWithoutComments(@PathVariable String searchName) {
        return eventService.findWithoutComments(searchName);
    }

    @PostMapping
    public ResponseEntity<Event> create(@RequestBody Event event) {
        return eventService.create(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> update(@RequestBody Event data, @PathVariable Long id) {
        return eventService.update(data, id);
    }

    @PatchMapping("/{id}/addcomment")
    public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody Comment comment) {
        return eventService.addComment(id, comment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return eventService.delete(id);
    }
}
