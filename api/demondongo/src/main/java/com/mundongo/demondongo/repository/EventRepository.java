package com.mundongo.demondongo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mundongo.demondongo.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
  List<Event> findByNameContainingIgnoreCase(String searchString);
}