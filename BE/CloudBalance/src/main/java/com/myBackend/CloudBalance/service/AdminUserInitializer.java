package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface AdminUserInitializer {
    public CommandLineRunner createAdminUser(UserDetailsRepository userDetailsRepository, PasswordEncoder passwordEncoder);
}
