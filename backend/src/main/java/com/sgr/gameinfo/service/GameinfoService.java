package com.sgr.gameinfo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sgr.gameinfo.model.Gameinfo;
import com.sgr.gameinfo.repo.GamePopulartag;
import com.sgr.gameinfo.repo.GameinfoMongoDBRepository;

@Service
public class GameinfoService {
	@Autowired
	private GameinfoMongoDBRepository gameinfoRepo;
	
	public Page<Gameinfo> getAllGameinfo(Pageable pageable){
		return gameinfoRepo.findAll(pageable);
	}
	
	public Gameinfo findOneById(int Id) {
		return gameinfoRepo.findOneById(Id);
	}

	public GamePopulartag findGameinfoById(Integer Id) {
		return gameinfoRepo.findGameinfoById(Id);
	}
	
	public Page<Gameinfo> searchGameinfoByName(Pageable pageable, String name){
		return gameinfoRepo.findByNameContainingIgnoreCase(pageable, name);
	}
	
	public Page<Gameinfo> findAllBytag(Pageable pageable, String tagName){
		return gameinfoRepo.findByPopularTagsContainingIgnoreCase(pageable, tagName);
	}

	public Page<Gameinfo> findByKoreanGame(Pageable pageable, String language) {
		return gameinfoRepo.findByLanguagesContaining(pageable, language);
	}

}
