package com.sgr.gameinfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonProcessingException;
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
@RequestMapping("/gamehistory")
public class GamehistroyController {
    @Autowired
    GamehistoryService gamehistoryService;

    @Autowired
    GameinfoService gameinfoService;

    @ApiResponses(value = { @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"), @ApiResponse(code = 500, message = "Failure") })

    @GetMapping()
    @ApiOperation(value = "게임상세정보")
    public Object gamehistory(@RequestParam int id) throws JsonProcessingException {
        ResponseEntity response = null;
        final GameinfoResponse result = new GameinfoResponse();

        Gamehistory gamehistoryOpt = gamehistoryService.findById(id);
        if(gamehistoryOpt != null) {
            Gameinfo gameinfoOpt = gameinfoService.findOneById(id);
            if(gameinfoOpt != null) {
                ArrayList<History> historylist =  gamehistoryOpt.getHistory();
                result.gamehistory = historylist;
                result.status = true;
                result.data = "success";
            } else {
                result.status = false;
                result.data = "gameinfo not found";
            }
        } else {
            result.status = false;
            result.data = "not found";
            response = new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        response = new ResponseEntity<>(result, HttpStatus.OK);
        return response;
    }

}
