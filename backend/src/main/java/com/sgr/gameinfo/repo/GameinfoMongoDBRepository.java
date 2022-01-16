package com.sgr.gameinfo.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sgr.gameinfo.model.Gameinfo;

@Repository
public interface GameinfoMongoDBRepository extends MongoRepository<Gameinfo, String> {
	public Page<Gameinfo> findAll(Pageable pageable);
	public Gameinfo findOneById(int Id);
	public Page<Gameinfo> findByNameContainingIgnoreCase(Pageable pageable, String name);
	public Page<Gameinfo> findByPopularTagsContainingIgnoreCase(Pageable pageable, String tagName);
	public GamePopulartag findGameinfoById(Integer Id);
	public Page<Gameinfo> findByLanguagesContaining(Pageable pageable, String language);
}
