package com.sgr.surveygamelist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sgr.surveygamelist.model.SurveyGameList;
import com.sgr.surveygamelist.repo.SurveyGameListMongoDBRepository;

@Service
public class SurvetGameListService {
	@Autowired
	private SurveyGameListMongoDBRepository surveyGameListRepo;
	
	public Page<SurveyGameList> getAllGameinfo(Pageable pageable){
		return surveyGameListRepo.findAll(pageable);
	}
}
 