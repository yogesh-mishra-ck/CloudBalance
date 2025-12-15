package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;

@Component
public class AdminUserInitializer {

    @Bean
    public CommandLineRunner createAdminUser(UserDetailsRepository userDetailsRepository, PasswordEncoder passwordEncoder){
        return args -> {
            if(userDetailsRepository.findByEmail("yogeshmishra@gmail.com").isEmpty()){
                User admin = new User();
                admin.setEmail("yogeshmishra@gmail.com");
                admin.setUserActive(true);
                admin.setFirstName("Yogesh");
                admin.setLastName("Mishra");
                admin.setLastLogin(Instant.now());
                admin.setPassword(passwordEncoder.encode("pass"));
                admin.setRole(Roles.ADMIN);

                userDetailsRepository.save(admin);
                System.out.println("Default admin user created");
            }
            if(userDetailsRepository.findByEmail("vijay@gmail.com").isEmpty()){
                User user = new User();
                user.setEmail("vijay@gmail.com");
                user.setUserActive(false);
                user.setFirstName("Vijay");
                user.setLastName("Kanwal");
                user.setLastLogin(Instant.now());
                user.setPassword(passwordEncoder.encode("pass123"));
                user.setRole(Roles.READ_ONLY);

                userDetailsRepository.save(user);
                System.out.println("Default normal user created");
            }
        };
    }
}
