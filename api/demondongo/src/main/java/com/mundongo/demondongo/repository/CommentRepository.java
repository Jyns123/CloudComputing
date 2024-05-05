package com.mundongo.demondongo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mundongo.demondongo.model.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
