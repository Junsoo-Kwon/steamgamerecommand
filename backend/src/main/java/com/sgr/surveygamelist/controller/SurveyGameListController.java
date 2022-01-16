package com.sgr.surveygamelist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.sgr.surveygamelist.model.SurveyGameList;
import com.sgr.surveygamelist.service.SurvetGameListService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/survey")
public class SurveyGameListController {
	@Autowired
	SurvetGameListService surveygamelistService;
	
	@GetMapping()
	public ResponseEntity<?> getGameinfoAllContent(@RequestParam int pageno){
		Pageable request = PageRequest.of(pageno, 25);
		Page<SurveyGameList> allGameInfoList = surveygamelistService.getAllGameinfo(request);

		return new ResponseEntity<Page<SurveyGameList>>(allGameInfoList, HttpStatus.OK);
	}
}
