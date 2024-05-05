package com.mundongo.demondongo.dto;

import java.time.LocalDate;
import java.util.Set;

import com.mundongo.demondongo.model.Event;
import com.mundongo.demondongo.model.Tag;

public class EventDTO {
  private Long id;

  private String name;

  private String city;

  private String country;

  private Set<Tag> tags;

  private String imageUrl;

  private LocalDate date;

  public LocalDate getDate() {
    return this.date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getImageUrl() {
    return this.imageUrl;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getCountry() {
    return this.country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public Set<Tag> getTags() {
    return this.tags;
  }

  public void setTags(Set<Tag> tags) {
    this.tags = tags;
  }

  public EventDTO() {
  }

  public EventDTO(Event data) {
    this.id = data.getId();
    this.name = data.getName();
    this.city = data.getCity();
    this.country = data.getCountry();
    this.tags = data.getTags();
    this.imageUrl = data.getImageUrl();
    this.date = data.getDate();
  }
}
