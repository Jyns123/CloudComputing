package com.mundongo.demondongo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mundongo.demondongo.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    
}
