package com.sgr.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgr.user.model.User;
import com.sgr.user.repo.SurveyRepository;

@Service
public class SurveyService {
    @Autowired
    private SurveyRepository surveyRepo;

    public void surveySave(User user){
        surveyRepo.save(user);
    } 
}
