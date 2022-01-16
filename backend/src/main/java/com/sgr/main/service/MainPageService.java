package com.sgr.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgr.gameinfo.model.Gameinfo;
import com.sgr.main.repo.MainPageRepository;

@Service
public class MainPageService {
    @Autowired
    private MainPageRepository mainPageRepository;

    public List<Gameinfo> findTop10ByOrderByReleaseDateDesc(){
        return mainPageRepository.findTop10ByOrderByReleaseDateDesc();
    }

    public List<Gameinfo> findTop12ByOrderByRecentReviewsPercentDesc() {
        return mainPageRepository.findTop12ByOrderByRecentReviewsPercentDesc();
    }

    public List<Gameinfo> findTop10ByOrderByAllReviewsCount() {
        return mainPageRepository.findTop10ByOrderByAllReviewsCount();
    }
}
