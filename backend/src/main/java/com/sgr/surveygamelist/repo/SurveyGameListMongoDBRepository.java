package com.sgr.surveygamelist.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.surveygamelist.model.SurveyGameList;

@Repository
public interface SurveyGameListMongoDBRepository extends MongoRepository<SurveyGameList, String> {
	public Page<SurveyGameList> findAll(Pageable pageable);
}
