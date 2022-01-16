package com.sgr.user.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.user.model.User;

@Repository
public interface SurveyRepository extends MongoRepository<User, String>{

	User save(User user);

}
