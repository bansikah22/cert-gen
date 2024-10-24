package com.bansikah.certificategeneratorswaggerui.service;


import com.bansikah.certificategeneratorswaggerui.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    private Map<String, User> users = new ConcurrentHashMap<>();

    public boolean registerUser(User user) {
        if (users.containsKey(user.getUsername())) {
            return false; // User already exists
        }
        users.put(user.getUsername(), user);
        return true;
    }

    public User loginUser(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
