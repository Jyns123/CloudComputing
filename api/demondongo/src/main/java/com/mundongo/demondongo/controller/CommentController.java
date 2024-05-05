package com.mundongo.demondongo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mundongo.demondongo.model.Comment;
import com.mundongo.demondongo.service.CommentService;

@RestController
@RequestMapping("api/comments")
public class CommentController {

  @Autowired
  private CommentService commentService;

  @GetMapping
  public ResponseEntity<List<Comment>> read() {
    return commentService.read();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Comment> find(@PathVariable Long id) {
    return commentService.find(id);
  }

  @PostMapping
  public ResponseEntity<Comment> create(@RequestBody Comment comment) {
    return commentService.create(comment);
  }

  @DeleteMapping
  public ResponseEntity<String> delete(Long id) {
    return commentService.delete(id);
  }
}
