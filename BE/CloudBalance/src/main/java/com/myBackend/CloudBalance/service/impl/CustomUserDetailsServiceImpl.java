package com.myBackend.CloudBalance.service.impl;

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
        return userDetailsRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
    }
}
