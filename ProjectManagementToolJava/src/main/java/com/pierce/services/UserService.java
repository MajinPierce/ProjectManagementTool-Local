package com.pierce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pierce.domain.User;
import com.pierce.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired    
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){
      newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

      //Username has to be unique (exception)

        // Make sure that password and confirmPassword match
        // confirmPassword is transient
      return userRepository.save(newUser);
    }

}