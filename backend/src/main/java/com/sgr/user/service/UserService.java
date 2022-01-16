package com.sgr.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgr.user.model.User;
import com.sgr.user.repo.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    
    public Optional<User> findBySteamid(String _id) {
        return userRepo.findById(_id);
    }

    public void save(User user) {
        userRepo.save(user);
    }
}
