package com.sgr.user.controller;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sgr.gameinfo.model.Gameinfo;
import com.sgr.gameinfo.repo.GamePopulartag;
import com.sgr.gameinfo.repo.GameinfoMongoDBRepository;
import com.sgr.gameinfo.service.GameinfoService;
import com.sgr.user.model.User;
import com.sgr.user.repo.UserRepository;
import com.sgr.user.response.SurveyResponse;
import com.sgr.user.response.UserResponse;
import com.sgr.user.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    GameinfoService gameinfoService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepo;

    @Autowired
    GameinfoMongoDBRepository gameinfoRepo;
    

    @ApiResponses(value = { @ApiResponse(code = 200, message = "OK"),
    @ApiResponse(code = 401, message = "Unauthorized"),
    @ApiResponse(code = 403, message = "Forbidden"),
    @ApiResponse(code = 404, message = "Not Found"),
    @ApiResponse(code = 500, message = "Failure") })

    @PostMapping("/survey")
    @ApiOperation(value = "설문 입력")
    public Object surveyModify(@RequestBody User user) {
        System.out.println(user);
        
        ResponseEntity response = null;
        final SurveyResponse result = new SurveyResponse();
        Optional<User> userOpt = userService.findBySteamid(user.get_id());

        if(userOpt.isPresent()) {
            result.status = true;
            
            User adduser = new User();
            adduser.set_id(userOpt.get().get_id());
            adduser.setSurvey_game_id(user.getSurvey_game_id());
            adduser.set_survey(true);

            HashMap<String, Integer> modifyPopulartags = new HashMap<>();

            for (int i = 0; i < user.getSurvey_game_id().length; i++) {
                int gameId = user.getSurvey_game_id()[i];
                String checkPopular_tag = gameinfoService.findGameinfoById(gameId).getPopularTags();
                String[] checkGenre = checkPopular_tag.split(",");
                // System.out.println("test1");
                for (int j = 0; j < checkGenre.length; j++) {
                    String key = checkGenre[j];
                    // System.out.println(key);
                    if(key.contains(".")) {
                        key = key.replace(".", "_");
                    }   
                    System.out.println(key);
                    // System.out.println("test2");
                    if(!modifyPopulartags.containsKey(key)) {
                        modifyPopulartags.put(key, 1);
                    } else {
                        int genreValue = modifyPopulartags.get(key);
                        modifyPopulartags.put(key, genreValue+1);
                    }
                }
            }
            System.out.println(modifyPopulartags);
            adduser.setPopularTags(modifyPopulartags);
            System.out.println("\n\n");
            System.out.println(adduser.toString());
            userService.save(adduser);
        } else {
            result.data = "fail";
        }

        
        response = new ResponseEntity<>(result, HttpStatus.OK);
        return response;
    }

    @GetMapping("/mypage")
    @ApiOperation(value = "마이페이지")
    public Object mypage(@RequestParam String uid) {

        ResponseEntity response = null;
        final UserResponse result = new UserResponse();
        Optional<User> userOpt = userService.findBySteamid(uid);

        if(userOpt.isPresent()) {
            int[] gamearr = userOpt.get().getSurvey_game_id();
            List<Gameinfo> gamelist = new LinkedList<>();
            for (int i = 0; i < gamearr.length; i++) {
               gamelist.add(gameinfoService.findOneById(gamearr[i]));
            }
            result.gameinfolist = gamelist;
            result.survey = userOpt;
            result.data = "true";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.data = "not user";
            response = new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return response;
    }
}
