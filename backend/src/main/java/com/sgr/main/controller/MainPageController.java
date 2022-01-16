package com.sgr.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgr.gameinfo.service.GameinfoService;
import com.sgr.main.response.MainPageResponse;
import com.sgr.main.service.MainPageService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/Main")
public class MainPageController {
	@Autowired
	GameinfoService gameinfoService;
    
    @Autowired
    MainPageService mainPageService;
    
    
	@ApiOperation(value = "메인 페이지")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "OK"),
			@ApiResponse(code = 401, message = "Unauthorized"),
			@ApiResponse(code = 403, message = "Forbidden"),
			@ApiResponse(code = 404, message = "Not Found"),
			@ApiResponse(code = 500, message = "Failure") })
	
	
	@GetMapping()
	public Object Mainpage(){
        ResponseEntity response = null;
		final MainPageResponse result = new MainPageResponse();
		result.recentGames = mainPageService.findTop10ByOrderByReleaseDateDesc();
		result.popularGames = mainPageService.findTop12ByOrderByRecentReviewsPercentDesc();
		result.mostplayedGames = mainPageService.findTop10ByOrderByAllReviewsCount();

        response = new ResponseEntity<>(result, HttpStatus.OK);
		return response;
	}
	

}
