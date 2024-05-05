package com.mundongo.demondongo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.mundongo.demondongo.model.Comment;

import java.util.*;

import com.mundongo.demondongo.repository.CommentRepository;

@Service
public class CommentService {
  @Autowired
  private CommentRepository commentRepository;

  public ResponseEntity<List<Comment>> read() {
    List<Comment> query = commentRepository.findAll();
    return new ResponseEntity<>(query, HttpStatus.OK);
  }

  public ResponseEntity<Comment> find(Long id) {
    Optional<Comment> query = commentRepository.findById(id);
    if (query.isPresent()) {
      return new ResponseEntity<>(query.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }

  public ResponseEntity<Comment> create(Comment comment) {
    return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.CREATED);
  }

  public ResponseEntity<String> delete(Long id) {
    commentRepository.deleteById(id);
    return new ResponseEntity<>("Comment deleted.", HttpStatus.OK);
  }
}