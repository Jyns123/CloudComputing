package com.mundongo.demondongo.model;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String color;

    @JsonIgnore
    @ManyToMany(mappedBy = "tags")
    private Set<Event> assignedEvents;

    public Set<Event> getAssignedEvents() {
        return this.assignedEvents;
    }

    public void setAssignedEvents(Set<Event> assignedEvents) {
        this.assignedEvents = assignedEvents;
    }

    public Tag() {
    }

    public Tag(String name, String color, Set<Event> assignedEvents) {
        this.name = name;
        this.color = color;
        this.assignedEvents = assignedEvents;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getColor() {
        return this.color;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
