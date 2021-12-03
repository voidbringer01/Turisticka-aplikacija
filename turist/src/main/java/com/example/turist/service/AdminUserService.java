package com.example.turist.service;

import com.example.turist.dto.UserRequest;
import com.example.turist.entity.AdminUser;
import com.example.turist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
    @Autowired
    UserRepository userRepository;


    public AdminUser register(UserRequest userRequest){
        AdminUser au = new AdminUser();
        au.setUsername(userRequest.getUsername());

        PasswordEncoder encoder = new BCryptPasswordEncoder();
        au.setPassword(encoder.encode(userRequest.getPassword()));
        return userRepository.save(au);

    }
}
