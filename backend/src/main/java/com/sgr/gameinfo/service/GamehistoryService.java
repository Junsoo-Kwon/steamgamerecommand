package com.sgr.gameinfo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgr.gameinfo.model.Gamehistory;
import com.sgr.gameinfo.repo.GamehistoryRepository;

@Service
public class GamehistoryService {
    @Autowired
    private GamehistoryRepository gamehistoryRepository;

    public Gamehistory findById(int Id) {
        return gamehistoryRepository.findById(Id);
    }
}
