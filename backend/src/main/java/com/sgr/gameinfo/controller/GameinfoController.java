package com.sgr.gameinfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.sgr.gameinfo.model.Gamehistory;
import com.sgr.gameinfo.model.Gameinfo;
import com.sgr.gameinfo.model.History;
import com.sgr.gameinfo.response.GameinfoResponse;
import com.sgr.gameinfo.service.GamehistoryService;
import com.sgr.gameinfo.service.GameinfoService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/gameinfo")
public class GameinfoController {
	@Autowired
	GameinfoService gameinfoService;

	@Autowired
	GamehistoryService gamehistoryService;
	
	@ApiOperation(value = "전체 검색")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "OK"),
			@ApiResponse(code = 401, message = "Unauthorized"),
			@ApiResponse(code = 403, message = "Forbidden"),
			@ApiResponse(code = 404, message = "Not Found"),
			@ApiResponse(code = 500, message = "Failure") })
	
			
	@GetMapping()
	public ResponseEntity<?> getGameinfoAllContent(@RequestParam int pageno, 
	@RequestParam(required = false) boolean KLsupport, @RequestParam(required = false, defaultValue = "100000000") int comparePrice){
		ResponseEntity response = null;
		final GameinfoResponse result = new GameinfoResponse();

		Pageable pagealbe = PageRequest.of(pageno, 100);
		Page<Gameinfo> findAllGame = gameinfoService.getAllGameinfo(pagealbe);

		if(KLsupport){
			findAllGame = gameinfoService.findByKoreanGame(pagealbe, "Korean");
		} 

		if(comparePrice != 100000000) {
			List<Gameinfo> findLowPriceGame = new LinkedList<>();
			for (Gameinfo gameinfo : findAllGame) {
				if(gameinfo.getOriginalPrice().length()>=1){
					if(gameinfo.getOriginalPrice().substring(1).getBytes()[0] >= 49 && gameinfo.getOriginalPrice().substring(1).getBytes()[0] <= 59){
						Float price = Float.parseFloat(gameinfo.getOriginalPrice().substring(1))*1200;
						if(price<=comparePrice) {
							gameinfo.setPrice(price);
							findLowPriceGame.add(gameinfo);
						}
					} 
				}
			}
			findAllGame = new PageImpl<>(findLowPriceGame, pagealbe, findLowPriceGame.size());
		}
		result.gameinfo = findAllGame;
		response = new ResponseEntity<Object>(result, HttpStatus.OK);
		return response;
	}

	@ApiOperation(value = "id기반 게임 단일 검색")
	@GetMapping("/{Id}")
	public ResponseEntity<?> GameDetail(@PathVariable int Id) {
		return new ResponseEntity<Gameinfo>(gameinfoService.findOneById(Id), HttpStatus.OK);
	}

	@ApiOperation(value = "이름 기반 게임 목록 검색")
	@GetMapping("/gamesearch/{name}")
	public ResponseEntity<?> gameSearch(@PathVariable String name, @RequestParam int pageno, 
	@RequestParam(required = false) boolean KLsupport, @RequestParam(required = false, defaultValue = "100000000") int comparePrice){
		ResponseEntity response = null;
		final GameinfoResponse result = new GameinfoResponse();

		Pageable request = PageRequest.of(pageno, 100, Sort.by("allReviewsCount").descending().and(Sort.by("allReviewsPercent").descending()));
		Page<Gameinfo> findGame = gameinfoService.searchGameinfoByName(request, name);
		result.gameinfo = findGame;
		if(KLsupport){
			List<Gameinfo> findKoreaGame = new LinkedList<>();
			for (Gameinfo gameinfo : findGame) {
				if(gameinfo.getLanguages().contains("Korean")){
					findKoreaGame.add(gameinfo);
				}
			}
			result.gameinfo = new PageImpl<>(findKoreaGame, request, findKoreaGame.size());
		} 

		if(comparePrice != 100000000) {
			List<Gameinfo> findLowPriceGame = new LinkedList<>();
			for (Gameinfo gameinfo : result.gameinfo) {
				if(gameinfo.getOriginalPrice().length()>=1){
					if(gameinfo.getOriginalPrice().substring(1).getBytes()[0] >= 49 && gameinfo.getOriginalPrice().substring(1).getBytes()[0] <= 59){
						Float price = Float.parseFloat(gameinfo.getOriginalPrice().substring(1))*1200;
						if(price<=comparePrice) {
							gameinfo.setPrice(price);
							findLowPriceGame.add(gameinfo);
						}
					} 
				}

			}
			result.gameinfo = new PageImpl<>(findLowPriceGame, request, findLowPriceGame.size());
		}

		response = new ResponseEntity<Object>(result, HttpStatus.OK);
		return response;
	}

	@ApiOperation(value = "태그 이름 기반 게임 목록 검색")
	@GetMapping("/tag/{tagname}")
	public ResponseEntity<?> GameGenre(@PathVariable String tagname, @RequestParam int pageno, 
	@RequestParam(required = false) boolean KLsupport, @RequestParam(required = false, defaultValue = "100000000") int comparePrice){
		ResponseEntity response = null;
		final GameinfoResponse result = new GameinfoResponse();

		Pageable request = PageRequest.of(pageno, 100, Sort.by("allReviewsCount").descending().and(Sort.by("allReviewsPercent").descending()));
		Page<Gameinfo> findGame = gameinfoService.findAllBytag(request, tagname);
		result.gameinfo = findGame;
		if(KLsupport){
			List<Gameinfo> findKoreaGame = new LinkedList<>();
			for (Gameinfo gameinfo : findGame) {
				if(gameinfo.getLanguages().contains("Korean")){
					findKoreaGame.add(gameinfo);
				}
			}
			result.gameinfo = new PageImpl<>(findKoreaGame, request, findKoreaGame.size());
		}

		if(comparePrice != 100000000) {
			List<Gameinfo> findLowPriceGame = new LinkedList<>();
			for (Gameinfo gameinfo : result.gameinfo) {
				if(gameinfo.getOriginalPrice().length()>=1){
					if(gameinfo.getOriginalPrice().substring(1).getBytes()[0] >= 49 && gameinfo.getOriginalPrice().substring(1).getBytes()[0] <= 59){
						Float price = Float.parseFloat(gameinfo.getOriginalPrice().substring(1))*1200;
						if(price<=comparePrice) {
							gameinfo.setPrice(price);
							findLowPriceGame.add(gameinfo);
						}
					} 
				}

			}
			result.gameinfo = new PageImpl<>(findLowPriceGame, request, findLowPriceGame.size());
		}

		response = new ResponseEntity<Object>(result, HttpStatus.OK);
		return response;
	}
}
