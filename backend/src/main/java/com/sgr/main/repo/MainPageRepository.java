package com.sgr.main.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.gameinfo.model.Gameinfo;

@Repository
public interface MainPageRepository extends MongoRepository<Gameinfo, String> {
    List<Gameinfo> findTop10ByOrderByAllReviewsCount();
    List<Gameinfo> findTop12ByOrderByRecentReviewsPercentDesc();
    List<Gameinfo> findTop10ByOrderByReleaseDateDesc();
}
