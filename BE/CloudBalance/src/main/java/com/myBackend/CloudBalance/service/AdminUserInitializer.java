package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer {

    @Bean
    public CommandLineRunner createAdminUser(UserDetailsRepository userDetailsRepository, PasswordEncoder passwordEncoder){
        return args -> {
            if(userDetailsRepository.findByUsername("admin").isEmpty()){
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("pass"));
                admin.setRole("admin");

                userDetailsRepository.save(admin);
                System.out.println("Default admin user created");
            }
            if(userDetailsRepository.findByUsername("user").isEmpty()){
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("pass123"));
                user.setRole("user");

                userDetailsRepository.save(user);
                System.out.println("Default normal user created");
            }
        };
    }
}
