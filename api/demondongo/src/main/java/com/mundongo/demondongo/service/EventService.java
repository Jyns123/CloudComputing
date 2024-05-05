package com.mundongo.demondongo.service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mundongo.demondongo.dto.EventDTO;
import com.mundongo.demondongo.model.Comment;
import com.mundongo.demondongo.model.Event;
import com.mundongo.demondongo.repository.CommentRepository;
import com.mundongo.demondongo.repository.EventRepository;

@Service
public class EventService {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private CommentRepository commentRepository;

  public ResponseEntity<List<Event>> read() {
    List<Event> query = eventRepository.findAll();
    return new ResponseEntity<>(query, HttpStatus.OK);
  }

  public ResponseEntity<Event> find(Long id) {
    Optional<Event> query = eventRepository.findById(id);
    if (query.isPresent()) {
      return new ResponseEntity<>(query.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<List<EventDTO>> readWithoutComments() {
    List<Event> query = eventRepository.findAll();
    ModelMapper modelMapper = new ModelMapper();
    Type listType = new TypeToken<List<EventDTO>>() {
    }.getType();
    List<EventDTO> dtos = modelMapper.map(query, listType);
    return new ResponseEntity<>(dtos, HttpStatus.OK);
  }

  public ResponseEntity<List<EventDTO>> findWithoutComments(String searchName) {
    List<Event> query = eventRepository.findByNameContainingIgnoreCase(searchName);
    ModelMapper modelMapper = new ModelMapper();
    Type listType = new TypeToken<List<EventDTO>>() {
    }.getType();
    List<EventDTO> dtos = modelMapper.map(query, listType);
    return new ResponseEntity<>(dtos, HttpStatus.OK);
  }

  public ResponseEntity<Event> create(Event event) {
    eventRepository.save(event);
    return new ResponseEntity<>(event, HttpStatus.CREATED);
  }

  public ResponseEntity<Event> update(Event data, Long id) {
    Optional<Event> query = eventRepository.findById(id);
    if (query.isPresent()) {
      Event instance = query.get();
      instance = data;
      eventRepository.save(instance);
      return new ResponseEntity<>(instance, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  public ResponseEntity<String> delete(Long id) {
    Optional<Event> query = eventRepository.findById(id);
    if (query.isPresent()) {
      eventRepository.deleteById(id);
      return new ResponseEntity<>("Event deleted.", HttpStatus.OK);
    } else {
      return new ResponseEntity<>("The event was not found.", HttpStatus.NOT_FOUND);
    }
  }

  public ResponseEntity<Comment> addComment(Long id, Comment comment) {
    Optional<Event> query = eventRepository.findById(id);
    if (query.isPresent()) {
      Comment savedComment = commentRepository.save(comment);
      Event eventInstance = query.get();

      savedComment.setParentEvent(eventInstance);
      eventInstance.addComment(savedComment);
      commentRepository.save(savedComment);
      eventRepository.save(eventInstance);
      return new ResponseEntity<>(savedComment, HttpStatus.CREATED);

    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }
}
