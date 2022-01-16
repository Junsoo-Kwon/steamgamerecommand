package com.sgr.user.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.user.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findById(String _id);
    User save(User user);
}
