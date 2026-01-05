package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.entity.CustomUserDetails;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;
    public CustomUserDetailsServiceImpl(UserDetailsRepository userDetailsRepository){
        this.userDetailsRepository = userDetailsRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Printing email"+email);
        User user = userDetailsRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
        return new CustomUserDetails(user);
//        return userDetailsRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
    }
}
