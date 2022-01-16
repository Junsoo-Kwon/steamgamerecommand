package com.sgr.gameinfo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.gameinfo.model.Gamehistory;

@Repository
public interface GamehistoryRepository extends MongoRepository<Gamehistory, String>{
    Gamehistory findById(int Id);
}
